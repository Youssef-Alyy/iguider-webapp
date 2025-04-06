import logging
from typing import List

from fastapi import APIRouter, Depends, Header, HTTPException, Request, Response, status

from app.crud.tag import (
    add_tag,
    delete_tag,
    fetch_all_tags,
    fetch_tag_by_id,
    update_tag,
)
from app.crud.user import get_current_user
from app.models.tag import TagItem, TagReq, TagRes

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()


## POST /tags/create -- create a tag
@router.post(
    "/create",
    summary="Create a tag.",
    status_code=status.HTTP_201_CREATED,
)
async def create_tag(tag: TagReq, request: Request, response: Response) -> dict:
    """create a tag."""
    access_token = None
    # Extract access token from cookies
    if "access_token" in request.cookies:
        access_token = request.cookies["access_token"]
        user = await get_current_user(access_token)
    if not access_token:
        logger.error("No access token found")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="No access token found"
        )
    response = await add_tag(tag, user.user_id)
    logger.info(f"Tag created successfully: {response}")
    return response


## UPDATE /tags/{tag_id} -- update a tag
@router.put(
    "/{tag_id}",
    summary="Update a tag.",
    status_code=status.HTTP_200_OK,
)
async def update_tag_by_id(
    tag_id: str, tag: TagReq, request: Request, response: Response
) -> dict:
    """update a tag by tag_id."""
    access_token = None
    # Extract access token from cookies
    if "access_token" in request.cookies:
        access_token = request.cookies["access_token"]
        user = await get_current_user(access_token)
    if not access_token:
        logger.error("No access token found")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="No access token found"
        )
    response = await update_tag(tag_id, tag, user.user_id)
    if response:
        logger.info(f"Tag {tag_id} updated successfully.")
        return response
    logger.error(f"Tag {tag_id} failed to update.")
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tag not found.")


## DELETE /tags/{tag_id} -- delete a tag
@router.delete(
    "/{tag_id}",
    summary="Delete a tag.",
    status_code=status.HTTP_200_OK,
)
async def delete_tag_by_id(tag_id: str, request: Request, response: Response) -> dict:
    """delete a tag by tag_id."""
    access_token = None
    # Extract access token from cookies
    if "access_token" in request.cookies:
        access_token = request.cookies["access_token"]
    if not access_token:
        logger.error("No access token found")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="No access token found"
        )

    response = await delete_tag(tag_id)
    if response:
        logger.info(f"Tag {tag_id} deleted successfully.")
        return response
    logger.error(f"Tag {tag_id} failed to delete.")
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tag not found.")


## GET /tags/{tag_id} -- get a tag
@router.get(
    "/{tag_id}",
    summary="Get a tag.",
    response_model=TagItem,
    status_code=status.HTTP_200_OK,
)
async def get_tag_by_id(tag_id: str, request: Request, response: Response) -> TagItem:
    """get a tag by tag_id."""

    access_token = None
    # Extract access token from cookies
    if "access_token" in request.cookies:
        access_token = request.cookies["access_token"]
    if not access_token:
        logger.error("No access token found")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="No access token found"
        )
    response = await fetch_tag_by_id(tag_id)
    if response:
        logger.info(f"Tag {tag_id} retrieved successfully.")
        return response
    logger.error(f"Tag {tag_id} failed to retrieve.")
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tag not found.")


## GET /tags -- get all tags of the authenticated user
@router.get(
    "/",
    summary="Get all tags of the authenticated user.",
    response_model=List[TagItem],
    status_code=status.HTTP_200_OK,
)
async def get_all_tags(request: Request, response: Response) -> List[TagItem]:
    """get all tags of the authenticated user."""
    access_token = None
    # Extract access token from cookies
    if "access_token" in request.cookies:
        access_token = request.cookies["access_token"]
        user = await get_current_user(access_token)
        user_id = user.user_id
    if not access_token:
        logger.error("No access token found")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="No access token found"
        )
    response = await fetch_all_tags(user_id)
    if response:
        logger.info(f"Tags retrieved successfully.")
        return response
    logger.error(f"Tags failed to retrieve.")
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tags not found.")
