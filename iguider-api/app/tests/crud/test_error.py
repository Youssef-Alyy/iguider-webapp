from unittest.mock import AsyncMock, MagicMock, Mock, patch

import pytest
import pytest_asyncio

from app.crud.error import add_error, get_error_by_id
from app.models.error import ErrorReq,Error


@pytest.mark.asyncio
async def test_get_error_by_id_found():
    # Arrange
    error_id = "existing-error-id"
    expected_error = Error(
        error_id=error_id,
        content="Test error",
        user_id="123",
    )

    # Mock errors_collection.find_one to return a sample error document
    with patch(
        "app.config.db.errors_collection.find_one", new_callable=AsyncMock
    ) as mock_find_one:
        mock_find_one.return_value = {"error_id": error_id, "content": "Test error","user_id":"123"}

        # Act
        error = await get_error_by_id(error_id)

        # Assert
        mock_find_one.assert_called_once_with({"error_id": error_id})
        assert error == expected_error


@pytest.mark.asyncio
async def test_get_error_by_id_not_found():
    # Arrange
    error_id = "non-existing-error-id"

    # Mock errors_collection.find_one to return None (error not found)
    with patch(
        "app.config.db.errors_collection.find_one", new_callable=AsyncMock
    ) as mock_find_one:
        mock_find_one.return_value = None

        # Act
        error = await get_error_by_id(error_id)

        # Assert
        mock_find_one.assert_called_once_with({"error_id": error_id})
        assert error is None


@pytest.mark.asyncio
async def test_get_error_by_id_exception():
    # Arrange
    error_id = "existing-error-id"

    # Mock errors_collection.find_one to raise an exception
    with patch(
        "app.config.db.errors_collection.find_one", new_callable=AsyncMock
    ) as mock_find_one:
        mock_find_one.side_effect = Exception("Database error")

        # Act
        error = await get_error_by_id(error_id)

        # Assert
        mock_find_one.assert_called_once_with({"error_id": error_id})
        assert error == {
            "status": "error",
            "message": "An error occurred while retrieving the error.",
        }
