from fastapi import APIRouter, Depends, HTTPException, status, Query
from pydantic import BaseModel
from typing import List
from queries.topics import TopicQueries, VotingQueries, CommentQueries
from models.topics import TopicIn, TopicOut, Voting


class HttpError(BaseModel):
    detail: str


class CommentRequest(BaseModel):
    username: str
    content: str


router = APIRouter()


@router.post("/api/topics", response_model=TopicOut | HttpError)
async def create_topic(
    topic: TopicIn, topics_queries: TopicQueries = Depends()
):
    try:
        created_topic = topics_queries.create_topic(topic)
        return created_topic
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
        )


@router.get("/api/topics/{topic_id}", response_model=TopicOut | HttpError)
async def get_topic_by_id(
    topic_id: str, topics_queries: TopicQueries = Depends()
):
    try:
        topic = topics_queries.get_topic_by_id(topic_id)
        return topic
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/api/topics", response_model=List[TopicOut] | HttpError)
async def get_all_topics(topics_queries: TopicQueries = Depends()):
    try:
        all_topics = topics_queries.get_all_topics()
        return all_topics
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=str(e)
        )


@router.get(
    "/api/topics/{topic_id}/by_id", response_model=List[TopicOut] | HttpError
)
async def get_topic_by_id(
    topic_id: str, topics_queries: TopicQueries = Depends()
):
    try:
        topic = topics_queries.get_topic(topic_id, by="id")
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


@router.delete("/api/topics/{topic_id}", response_model=dict | HttpError)
async def delete_topic(
    topic_id: str, topics_queries: TopicQueries = Depends()
):
    try:
        topics_queries.delete_topic(topic_id)
        return {"message": "Topic deleted successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
        )


@router.get("/api/topic-of-the-day", response_model=TopicOut | HttpError)
async def get_topic_of_the_day(topics_queries: TopicQueries = Depends()):
    try:
        return topics_queries.get_topic_of_the_day()
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
    username: str,
    vote_type: str,
    voting_queries: VotingQueries = Depends(),
):
    try:
        voting_queries.record_vote(topic_id, username, vote_type)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
        )


@router.get("/api/topics/{topic_id}/voting", response_model=Voting | HttpError)
async def get_voting_data_by_topic_id(
    topic_id: str, voting_queries: VotingQueries = Depends()
):
    try:
        voting_data = voting_queries.get_voting_data(topic_id)
        return voting_data
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=str(e)
        )


@router.put(
    "/api/topics/{topic_id}/vote", status_code=status.HTTP_204_NO_CONTENT
)
async def update_user_vote(
    topic_id: str,
    username: str,
    vote_type: str,
    voting_queries: VotingQueries = Depends(),
):
    try:
        voting_queries.update_vote(topic_id, username, vote_type)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
        )
    return {"detail": "Vote updated successfully."}


@router.delete(
    "/api/topics/{topic_id}/vote/{username}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_user_vote(
    topic_id: str,
    username: str,
    voting_queries: VotingQueries = Depends(),
):
    try:
        voting_queries.delete_vote(topic_id, username)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
        )
    return {"detail": "Vote deleted successfully."}


@router.post("/api/topics/{topic_id}/comment")
async def add_comment_to_topic(
    topic_id: str,
    comment_request: CommentRequest,
    comment_queries: CommentQueries = Depends(),
):
    username = comment_request.username
    content = comment_request.content
    comment_queries.add_comment(topic_id, username, content)
    return {"message": "Comment added successfully."}


@router.get("/api/comments/")
async def get_comments(
    topic_id: str = None,
    username: str = None,
    comment_queries: CommentQueries = Depends(),
):
    comments = comment_queries.get_comments(
        username=username, topic_id=topic_id
    )
    return {"comments": comments}


@router.put("/api/topics/{topic_id}/comment")
async def update_comment(
    topic_id: str,
    username: str = Query(...),
    new_content: str = Query(...),
    comment_queries: CommentQueries = Depends(),
):
    comment_queries.update_comment(topic_id, username, new_content)
    return {"message": "Comment updated successfully."}


@router.delete("/api/topics/{topic_id}/comment")
async def delete_comment(
    topic_id: str,
    username: str = Query(...),
    comment_queries: CommentQueries = Depends(),
):
    comment_queries.delete_comment(topic_id, username)
    return {"message": "Comment deleted successfully."}


@router.get("/api/topics", response_model=List[TopicOut] | HttpError)
async def get_all_topics(topics_queries: TopicQueries = Depends()):
    try:
        all_topics = topics_queries.get_all_topics()
        return all_topics
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=str(e)
        )


# async def get_all_games(queries: GamesQueries = Depends():
#     account_data: dict = Depends(authenticator.get_current_account_data),
#     try:
#         all_games = queries.get_all_games(account_data['id'])
#         return all_games
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND, detail=str(e)


@router.get("/api/topic-of-the-day", response_model=TopicOut | HttpError)
async def get_topic_of_the_day(topics_queries: TopicQueries = Depends()):
    try:
        return topics_queries.get_topic_of_the_day()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=str(e)
        )
