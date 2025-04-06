import json
import logging
import os
from datetime import UTC, datetime
from typing import List

from fastapi import File
from motor.motor_asyncio import AsyncIOMotorCursor
from pymongo.collection import Collection

from app.config.celery import app
from app.config.db import reports_collection
from app.crud.utils import generate_uuid
from app.models.report import (
    Report,
    ReportCall,
    ReportLink,
    ReportParagraph,
    ReportReq,
    ReportRes,
    VersionHistory,
)

UPLOAD_DIR = "/public/files/"

# Setup logging
logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


@app.task
def upload_report(file_content: bytes, title: str, user_id: str) -> dict:

    # Ensure the upload directory exists
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)

    # Save the uploaded file to the file system
    file_path = os.path.join(
        UPLOAD_DIR, datetime.now().strftime("%Y%m%d%H%M%S") + ".json"
    )

    with open(file_path, "wb") as f:
        f.write(file_content)

    # Parse the JSON content
    content_str = file_content.decode("utf-8")
    json_content = json.loads(content_str)

    # Extract the hash from the JSON
    file_hash = json_content["target"]["file"]["sha256"]

    # Create the report document to insert into MongoDB
    report = {
        "report_id": generate_uuid(),
        "title": title,
        "hash": file_hash,
        "timestamp": datetime.now(),
        "user_id": user_id,
        "file_path": file_path,
        "history": [],
        "tags": [],
        "status": "In Analysis",
    }

    logger.info(f"Inserting report into MongoDB: {report}")

    try:
        # Insert the report into MongoDB
        reports_collection.insert_one(report)
        return {"message": "Report uploaded successfully", "file_path": file_path}
    except DuplicateKeyError:
        # Handle the duplicate key error
        logger.error(
            "Duplicate key error: report with same title and user_id already exists."
        )
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "A report with this title already exists"},
        )

    return {"message": "Report uploaded successfully", "file_path": file_path}


async def get_report(report_id: str):
    try:
        # Retrieve the report document from the collection
        report = await reports_collection.find_one({"report_id": report_id})
        if report:
            return report
        else:
            return None
    except Exception as e:
        # Handle exceptions and return an error message
        return {
            "status": "error",
            "message": f"An error occurred while retrieving the report.",
        }


async def update_report(report_id: str, new_report: ReportReq) -> ReportRes:
    """Save the modifications made to the report."""
    try:
        report = await get_report(report_id)
        if not report:
            logger.info("Report not found")
            return ReportRes(
                status="error", message="An error occurred while updating the report"
            )

        logger.info("Report found")

        # Get last version of the report
        last_version = report["history"][-1] if report["history"] else None

        # Create a new version of the report from previous version
        new_version = {
            "version_id": datetime.now(UTC),
            "paragraphs": last_version["paragraphs"] if last_version else [],
            "calls": last_version["calls"] if last_version else [],
            "links": [link.dict() for link in new_report.links],
        }

        old_paragraphs = new_version.get("paragraphs", [])
        old_calls = new_version.get("calls", [])

        # Update the new version with the content from new_report
        new_version["paragraphs"] = [
            ReportParagraph(
                uuid=p.get("uuid") if i < len(old_paragraphs) else generate_uuid(),
                content=new_report.paragraphs[i].content,
            ).dict()
            for i, p in enumerate(
                old_paragraphs
                + [{}]
                * (
                    max(len(new_report.paragraphs), len(old_paragraphs))
                    - len(old_paragraphs)
                )
            )
        ]

        new_version["calls"] = [
            ReportCall(
                uuid=p.get("uuid") if i < len(old_calls) else generate_uuid(),
                content=new_report.calls[i].content,
            ).dict()
            for i, p in enumerate(
                old_calls
                + [{}] * (max(len(new_report.calls), len(old_calls)) - len(old_calls))
            )
        ]

        # Update the report document with the new version
        result = await reports_collection.update_one(
            {"report_id": report_id},
            {"$push": {"history": new_version}},
        )

        # Check if the update operation was successful
        if result.modified_count > 0:
            return ReportRes(status="success", message="Report updated successfully.")
        else:
            return ReportRes(status="failure", message="Failed to update report.")

    except Exception as e:
        # Handle exceptions and return an error message
        logger.error(f"Failed to update report: {e}")
        return ReportRes(
            status="error", message="An error occurred while updating the report"
        )


async def get_report_history(report_id: str) -> List[VersionHistory]:
    """Get the history of a report."""
    try:
        # Retrieve the report document from the collection
        report = await reports_collection.find_one({"report_id": report_id})
        # Check if the report document was found
        if report and "history" in report:
            return [VersionHistory(**version) for version in report["history"]]
        else:
            return []
    except Exception as e:
        # Handle exceptions and return an error message
        logger.error(f"An error occurred while retrieving the report history: {e}")
        return []


async def get_reports_count():
    """Get the total number of reports."""
    count = await reports_collection.count_documents({})
    return count


async def search_reports_in_db(query: str, limit: int, user_id: str) -> List[Report]:
    search_criteria = {
        "$and": [
            {
                "$or": [
                    {"hash": {"$regex": f"^{query}", "$options": "i"}},
                    {"tags": {"$regex": f"^{query}", "$options": "i"}},
                    {"title": {"$regex": f"^{query}", "$options": "i"}},
                    {"vendor": {"$regex": f"^{query}", "$options": "i"}},
                ]
            },
            {"user_id": user_id},
        ]
    }
    cursor = reports_collection.find(search_criteria).limit(limit)
    reports = await cursor.to_list(length=limit)
    if reports:
        logger.info(f"Reports matching query '{query}' retrieved successfully.")
        return reports
    else:
        logger.info(
            f"No reports found matching query '{query}' for user_id '{user_id}'."
        )
        return []


async def get_all_reports(skip: int = 0, limit: int = 10) -> List[Report]:
    """Get all reports with pagination."""
    cursor = reports_collection.find().skip(skip).limit(limit)
    reports = []
    async for report in cursor:
        # Assuming report is a dictionary fetched from the database
        report_obj = Report(
            report_id=report["report_id"],
            hash=report["hash"],
            timestamp=report["timestamp"],
            file_path=report["file_path"],
            user_id=report["user_id"],
            title=report.get("title"),
            vendor=report.get("vendor"),
            tags=report.get("tags", []),
            history=report["history"],
            status=report["status"],
        )
        reports.append(report_obj)
    return reports


async def get_reports_for_user(user_id: str, page: int = 1, limit: int = 10) -> list:
    try:
        search_criteria = {"user_id": user_id}
        skip = (page - 1) * limit
        cursor: AsyncIOMotorCursor = (
            reports_collection.find(search_criteria).skip(skip).limit(limit)
        )
        reports = await cursor.to_list(length=limit)
        if not reports:
            logger.info(f"No more reports found for user '{user_id}'.")
        return reports
    except Exception as e:
        logger.error(f"An error occurred while searching for the reports: {e}")
        return []


async def get_status_counts():
    statuses = ["Completed", "In Analysis", "In Generation", "Failed"]
    status_counts = {}
    try:
        for status in statuses:
            count = await reports_collection.count_documents({"status": status})
            status_counts[status] = count
        return status_counts
    except Exception as e:
        logger.error(f"An error occurred while retrieving the counts: {e}")
        return {status: 0 for status in statuses}
