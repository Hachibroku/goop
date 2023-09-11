from pydantic import BaseModel, Field
from typing import List, Dict, Optional


class TopicIn(BaseModel):
    title: str
    image_url: str
    description: str


class CommentIn(BaseModel):
    username: str = None
    content: str = Field(..., max_length=140)


class CommentOut(BaseModel):
    username: str = None
    content: str = Field(..., max_length=140)


class Voting(BaseModel):
    user_votes: Dict[str, str] = {}
    agree_count: int = 0
    disagree_count: int = 0


class VoteData(BaseModel):
    username: str
    vote_type: str


class TopicOut(BaseModel):
    id: str
    title: str
    image_url: str
    description: str
    voting: Optional[Voting]
    comments: Optional[List[CommentOut]] = []


class SearchTopicOut(BaseModel):
    id: str
    title: str
    image_url: str
    description: str


class SearchTopicList(BaseModel):
    topics: List[SearchTopicOut]


class TopicList(BaseModel):
    topics: List[TopicOut]
