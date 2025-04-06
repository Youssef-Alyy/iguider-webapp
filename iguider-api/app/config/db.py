from motor import motor_asyncio
from motor.motor_asyncio import AsyncIOMotorClient

from app.config.settings import settings


class Database:
    # Static variable to store the MongoDB client
    client: AsyncIOMotorClient = None

    @classmethod
    def connect(cls):
        # Establish a connection to the MongoDB database
        cls.client = AsyncIOMotorClient(settings.DATABASE_URL)

    @classmethod
    def get_database(cls):
        # Retrieve the MongoDB database from the client
        return cls.client[settings.DATABASE_NAME]

    @classmethod
    async def close(cls):
        # Close the MongoDB client connection
        cls.client.close()


# Create an instance of the Database class
db = Database()

# Connect to the MongoDB database
db.connect()

# Get the MongoDB database from the client
db = db.get_database()

users_collection = db["users"]
users_collection.create_index("user_id", unique=True)
users_collection.create_index("email", unique=True)

# Access the "tags" collection within the database
tags_collection = db["tags"]
tags_collection.create_index("tag_id", unique=True)
tags_collection.create_index("tag_name", unique=True)

# Access the "reports" collection within the database
reports_collection = db["reports"]
reports_collection.create_index("report_id", unique=True)
reports_collection.create_index("user_id", unique=False)

# Access the "errors" collection within the database
errors_collection = db["errors"]
errors_collection.create_index("error_id", unique=True)
