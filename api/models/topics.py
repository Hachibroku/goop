from pydantic import BaseModel
from typing import List, Dict


# MODEL FOR WHEN YOU MAKE A NEW TOPIC
class TopicIn(BaseModel):
    title: str
    image_url: str
    description: str


# Model for casting a vote
# class Voting(BaseModel):
#     user_ids: List[str]
#     # changed to list of user_ids since we are going to store
#     # multiple votes and multiple users
#     agree_count: int
#     disagree_count: int


class Voting(BaseModel):
    user_votes: Dict[str, str] = {}
    # changed to list of user_ids since we are going to store
    # multiple votes and multiple users
    agree_count: int = 0
    disagree_count: int = 0


# MODEL OF TOPIC WITH ITS ID AFTER ITS BEEN MADE, voting is embedded
class TopicOut(BaseModel):
    id: str
    title: str
    image_url: str
    description: str
    voting: Voting


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
