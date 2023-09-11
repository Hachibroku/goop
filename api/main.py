from fastapi import FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts, topics
import os
import motor.motor_asyncio

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(topics.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


MONGODB_URL = "mongodb://murph:password@db:27017"
client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
database = client.mydatabase
