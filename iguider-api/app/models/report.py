from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class ReportParagraph(BaseModel):
    uuid: str
    content: str


class ReportCall(BaseModel):
    uuid: str
    content: str


class ReportLink(BaseModel):
    paragraph: str
    calls: List[str]


class VersionHistory(BaseModel):
    version_id: datetime
    paragraphs: List[ReportParagraph]
    calls: List[ReportCall]
    links: List[ReportLink]


class Report(BaseModel):
    report_id: str
    title: str
    hash: str
    timestamp: datetime
    file_path: str
    user_id: str
    vendor: Optional[str] | None = None
    tags: List[str]
    history: List[VersionHistory]
    status: str


class ReportRes(BaseModel):
    status: str
    message: str

    class Config:
        json_schema_extra = {
            "example": {
                "status": "success",
                "message": "Report is being processed",
            }
        }


class ContentReq(BaseModel):
    content: str

    class Config:
        json_schema_extra = {"example": {"content": "This is a paragraph."}}


class ReportReq(BaseModel):
    paragraphs: List[ContentReq]
    calls: List[ContentReq]
    links: List[ReportLink]

    class Config:
        json_schema_extra = {
            "example": {
                "paragraphs": [
                    {"content": "First paragraph"},
                    {"content": "Second paragraph"},
                ],
                "calls": [
                    {"content": "First call"},
                    {"content": "Second call"},
                ],
                "links": [
                    {"paragraph": "1", "calls": ["1", "2"]},
                    {"paragraph": "2", "calls": ["1"]},
                ],
            }
        }
