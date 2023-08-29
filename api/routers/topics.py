from fastapi import APIRouter, Depends, HTTPException, status, Query
from pydantic import BaseModel
from typing import List, Dict, Any
from bson import ObjectId
from queries.topics import TopicQueries
from authenticator import (
    authenticator,
)
from models.topics import (
    TopicIn,
    TopicOut,
)
import traceback


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


@router.put("/api/topics/{topic_id}", response_model=TopicOut | HttpError)
async def update_topic(
    topic_id: str,
    updated_topic: TopicIn,
    topics_queries: TopicQueries = Depends(),
):
    try:
        updated = topics_queries.update_topic(topic_id, updated_topic)
        return updated
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
        )


@router.post(
    "/api/topics/{topic_id}/vote",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def record_vote(
    topic_id: str,
    user_id: str,
    vote_type: str,
    topics_queries: TopicQueries = Depends(),
):
    topic_id = ObjectId(topic_id)
    # user_id = ObjectId(user_id) this will probably be required later
    try:
        topics_queries.record_vote(topic_id, user_id, vote_type)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
        )


@router.get("/api/votes/", response_model=List[Dict[str, Any]])
async def get_votes(
    user_id: str = Query(...),
    topics_queries: TopicQueries = Depends(),
):
    try:
        user_votes = topics_queries.get_votes(user_id)
        return user_votes
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
        )


@router.post("/api/topics/{topic_id}/comment")
async def add_comment_to_topic(
    topic_id: str,
    user_id: str = Query(...),
    content: str = Query(...),
    topics_queries: TopicQueries = Depends(),
):
    topics_queries.add_comment(topic_id, user_id, content)
    return {"message": "Comment added successfully."}


@router.get("/api/comments/")
async def get_comments(
    topic_id: str = None,
    user_id: str = None,
    topics_queries: TopicQueries = Depends(),  # Assuming TopicQueries has a `get_comments` method
):
    comments = topics_queries.get_comments(user_id=user_id, topic_id=topic_id)
    return {"comments": comments}


@router.put("/api/topics/{topic_id}/comment")
async def update_comment(
    topic_id: str,
    user_id: str = Query(...),
    new_content: str = Query(...),
    topics_queries: TopicQueries = Depends(),
):
    topics_queries.update_comment(topic_id, user_id, new_content)
    return {"message": "Comment updated successfully."}


@router.delete("/api/topics/{topic_id}/comment")
async def delete_comment(
    topic_id: str,
    user_id: str = Query(...),
    topics_queries: TopicQueries = Depends(),
):
    topics_queries.delete_comment(topic_id, user_id)
    return {"message": "Comment deleted successfully."}
