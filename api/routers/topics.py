from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List
from queries.topics import TopicQueries
from authenticator import (
    authenticator,
)
from models.topics import (
    TopicIn,
    TopicOut,
    Voting,
)


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/topics", response_model=TopicOut | HttpError)
async def create_topic(
    topic: TopicIn, topics_queries: TopicQueries = Depends()
):
    try:
        created_topic = topics_queries.create(topic)
        return created_topic
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
        )


@router.get("/api/topics/{title}", response_model=List[TopicOut] | HttpError)
async def get_topic_by_title(
    title: str, topics_queries: TopicQueries = Depends()
):
    try:
        topic = topics_queries.get_topic(title)
        return topic
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=str(e)
        )


@router.post(
    "/api/topics/{topic_id}/vote",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def record_vote(
    topic_id: str,
    user_id: int,
    vote_type: str,
    topics_queries: TopicQueries = Depends(),
):
    try:
        topics_queries.record_vote(topic_id, user_id, vote_type)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
        )
