import logging
from typing import List

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    Query,
    Request,
    Response,
    UploadFile,
    status,
)

from app.config.db import reports_collection
from app.crud.report import (
    get_report,
    get_report_history,
    get_reports_for_user,
    search_reports_in_db,
    update_report,
    upload_report,
)
from app.crud.user import get_current_user
from app.models.report import Report, ReportReq, ReportRes, VersionHistory

router = APIRouter()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@router.get(
    "/",
    summary="List reports for authenticated user.",
    response_model=List[Report],
    status_code=status.HTTP_200_OK,
)
async def get_reports(
    request: Request,
    limit: int = Query(10, description="Limit the number of results per page"),
    page: int = Query(1, description="Page number, starting from 1"),
):
    """Get paginated reports of the authenticated user."""
    access_token = request.cookies.get("access_token")
    if access_token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="No access token found"
        )
    try:
        user = await get_current_user(access_token)
        user_id = user.user_id
        reports = await get_reports_for_user(user_id, page, limit)
        if reports:
            logger.info(f"Reports matching query '{user_id}' retrieved successfully.")
            return reports
        else:
            logger.info(f"No reports found matching query '{user_id}'.")
            return []
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        logger.error(f"An error occurred while searching for reports: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while searching for reports.",
        )


@router.post(
    "/upload",
    summary="Upload report to the server for processing.",
    status_code=status.HTTP_200_OK,
)
async def upload_report_route(
    request: Request, title: str = Form(...), file: UploadFile = File(...)
):
    access_token = request.cookies.get("access_token")

    if not access_token:
        logger.error("No access token found")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User is not logged in."
        )
    user = await get_current_user(access_token)

    try:
        file_content = await file.read()
        upload_report.apply_async(args=[file_content, title, user.user_id])
    except Exception as e:
        logger.error(f"File upload failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process the report.",
        )

    return {"message": "Report is being processed."}


@router.get(
    "/search",
    summary="Search reports by hash, title, vendor, or tag.",
    response_model=List[Report],
    status_code=status.HTTP_200_OK,
)
async def search_reports(
    request: Request,
    query: str = Query(..., description="Search query"),
    limit: int = Query(10, description="Limit the number of results"),
):
    if "access_token" in request.cookies:
        access_token = request.cookies["access_token"]
    if not access_token:
        logger.error("No access token found")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User is not logged in."
        )
    user = await get_current_user(access_token)
    response = await search_reports_in_db(query, limit, user.user_id)
    logger.info(f"Search response: {response}")
    if response:
        logger.info(f"Search for query '{query}' returned {len(response)} reports.")
        return response
    logger.error(f"No reports found for query '{query}'.")
    return []


@router.get(
    "/{report_id}",
    summary="Get the report.",
    response_model=Report,
    status_code=status.HTTP_200_OK,
)
async def get_report_route(report_id: str):
    response = await get_report(report_id)
    if response:
        logger.info(f"Report {report_id} retrieved successfully.")
        return response
    logger.error(f"Report {report_id} failed to retrieve.")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail="Report not found."
    )


@router.post(
    "/{report_id}/save",
    summary="Save the modifications made to the report.",
    status_code=status.HTTP_200_OK,
    response_model=ReportRes,
)
async def update_report_with_modifications(
    report_id: str, report: ReportReq, request: Request, response: Response
) -> ReportRes:
    access_token = None
    # Extract access token from cookies
    if "access_token" in request.cookies:
        access_token = request.cookies["access_token"]
    if not access_token:
        logger.error("No access token found")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="No access token found"
        )
    try:
        response = await update_report(report_id, report)
        return response
    except Exception as e:
        logger.error(f"An error occurred while updating the report.")
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="Failed to update report.",
        )


@router.get(
    "/{report_id}/history",
    summary="Get the modification history of a report.",
    response_model=List[VersionHistory],
    status_code=status.HTTP_200_OK,
)
async def retrieve_report_history(
    report_id: str, request: Request, response: Response
) -> list[Report]:
    access_token = None
    # Get access token from cookies
    if "access_token" in request.cookies:
        access_token = request.cookies["access_token"]
    if not access_token:
        logger.error("No access token found")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="No access token found"
        )
    response = await get_report_history(report_id)
    if response:
        logger.info(f"Report history retrieved successfully.")
        return response
