from pydantic import BaseModel, Field
from typing import List, Optional


# MODEL FOR WHEN YOU MAKE A NEW TOPIC
class TopicIn(BaseModel):
    title: str
    image_url: str
    description: str


class Comment(BaseModel):
    user_id: str
    content: str = Field(..., max_length=140)


# Model for casting a vote
class Voting(BaseModel):
    user_id: List[str]
    agree_count: int
    disagree_count: int


# MODEL OF TOPIC WITH ITS ID AFTER ITS BEEN MADE, voting is embedded
class TopicOut(BaseModel):
    id: str
    title: str
    image_url: str
    description: str
    voting: Optional[Voting]
    comments: Optional[List[Comment]] = []


# THIS MODEL SHOULD HAVE ALL THE SAME KEY:VALUE AS TopicOut
class SearchTopicOut(BaseModel):
    id: str
    title: str
    image_url: str
    description: str


# THIS MODEL IS TO SEARCH LIST OF TOPICS BY THE PARAMETERS IN SearchTopicOut
class SearchTopicList(BaseModel):
    topics: List[SearchTopicOut]


# THIS MODEL IS TO SHOW A LIST OF ALL TOPICS
class TopicList(BaseModel):
    topics: List[TopicOut]
