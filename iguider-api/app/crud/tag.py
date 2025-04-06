from typing import List

from app.config.db import tags_collection
from app.crud.utils import generate_uuid
from app.models.tag import TagItem, TagReq, TagRes


async def add_tag(tag: TagReq, user_id: str) -> TagRes:
    """add a tag."""
    try:
        tag_id = generate_uuid()
        tag_dict = {"tag_id": tag_id, **tag.dict(), "user_id": user_id}

        # Insert the tag document into the collection
        result = await tags_collection.insert_one(tag_dict)

        # Check if the insert operation was successful
        if result.inserted_id:
            return {
                "status": "success",
                "message": "Tag inserted successfully.",
                "tag_id": tag_id,
                "user_id": user_id,
            }
        else:
            return {"status": "failure", "message": "Tag insertion failed."}
    except Exception as e:
        # Handle exceptions and return an error message
        return {"status": "error", "message": "An error occurred while adding tag."}


async def update_tag(tag_id: str, tag: TagReq, user_id: str) -> TagRes:
    """update a tag by tag_id."""
    try:
        # Add the user_id to the tag object
        tag_dict = tag.dict()
        tag_dict["user_id"] = user_id

        # Update the user document in the collection
        result = await tags_collection.update_one(
            {"tag_id": tag_id},
            {"$set": tag_dict},
        )

        # Check if the update operation was successful
        if result.matched_count > 0:
            if result.modified_count > 0:
                return {
                    "status": "success",
                    "message": "Tag updated successfully.",
                    "tag_id": tag_id,
                    "user_id": user_id,
                }
            else:
                return {"status": "success", "message": "Tag was already up to date."}
        else:
            return {"status": "failure", "message": "Tag not found."}

    except Exception as e:
        # Handle exceptions and return an error message
        return {"status": "error", "message": "An error occurred while updating tag"}


async def delete_tag(tag_id: str) -> TagRes:
    """delete a tag by tag_id."""
    try:
        # Delete the user document from the collection
        result = await tags_collection.delete_one({"tag_id": tag_id})

        # Check if the delete operation was successful
        if result.deleted_count > 0:
            return {
                "status": "success",
                "message": "Tag deleted successfully.",
                "tag_id": tag_id,
            }
        else:
            return {"status": "failure", "message": "Tag deletion failed."}
    except Exception as e:
        # Handle exceptions and return an error message
        return {"status": "error", "message": "An error occurred while deleting tag."}


async def fetch_tag_by_id(tag_id: str) -> TagItem:
    """fetch a tag by tag_id."""
    tag_data = await tags_collection.find_one({"tag_id": tag_id}, {"_id": 0})
    if tag_data:
        return TagItem(**tag_data)


async def fetch_all_tags(user_id: str) -> List[TagItem]:
    """fetch all tags by user_id."""
    tag_data = tags_collection.find({"user_id": user_id}, {"_id": 0})
    return [TagItem(**tag) async for tag in tag_data]
