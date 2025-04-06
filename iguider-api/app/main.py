import asyncio
import logging
from contextlib import asynccontextmanager
from datetime import UTC, datetime, timedelta

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.main import api_router

# from app.config.db import initiate_database
from app.config.db import users_collection

logger = logging.getLogger(__name__)


async def remove_unverified_users():
    cutoff_time = datetime.now(UTC) - timedelta(hours=24)
    result = await users_collection.delete_many(
        {"is_verified": False, "date_created": {"$lt": str(cutoff_time)}}
    )
    logger.info(
        f"{result.deleted_count} unverified users older than 24 hours have been removed."
    )


async def periodic_cleanup(interval: int):
    while True:
        await remove_unverified_users()
        await asyncio.sleep(interval)


@asynccontextmanager
async def lifespan(app: FastAPI):
    asyncio.create_task(periodic_cleanup(3600))
    yield


def get_application():
    app = FastAPI(
        title="IGuider API", version="0.1", docs_url="/docs", lifespan=lifespan
    )
    app.include_router(api_router, prefix="/api")
    return app


app = get_application()

origins = ["http://localhost:3000", "http://localhost:3001"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=[
        "Access-Control-Allow-Headers",
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Origin",
    ],
)


@app.get("/", tags=["health"])
async def health():
    return dict(
        name="IGuider API",
        version="0.1",
        status="OK",
        message="Visit /docs for more information.",
    )
