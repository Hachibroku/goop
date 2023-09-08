from pydantic import BaseModel, Field
from typing import List, Dict, Optional


class TopicIn(BaseModel):
    title: str
    image_url: str
    description: str


class Comment(BaseModel):
    user_id: str
    content: str = Field(..., max_length=140)


class Voting(BaseModel):
    user_votes: Dict[str, str] = {}
    agree_count: int = 0
    disagree_count: int = 0


class TopicOut(BaseModel):
    id: str
    title: str
    image_url: str
    description: str
    voting: Optional[Voting]
    comments: Optional[List[Comment]] = []


class SearchTopicOut(BaseModel):
    id: str
    title: str
    image_url: str
    description: str


class SearchTopicList(BaseModel):
    topics: List[SearchTopicOut]


class TopicList(BaseModel):
    topics: List[TopicOut]
