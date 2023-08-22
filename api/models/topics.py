from pydantic import BaseModel
from typing import List, Optional


# # MODEL FOR WHEN YOU MAKE A NEW TOPIC
class TopicIn(BaseModel):
    title: str
    author: str
    image_url: str
    description: str


# # MODEL OF TOPIC WITH ITS ID AFTER ITS BEEN MADE
class TopicOut(BaseModel):
    id: str
    title: str
    author: str
    image_url: str
    description: str


# # THIS MODEL SHOULD HAVE ALL THE SAME KEY:VALUE AS TopicOut
class SearchTopicOut(BaseModel):
    id: str
    title: str
    author: str
    image_url: str
    description: str


# # THIS MODEL IS TO SEARCH LIST OF TOPICS BY THE PARAMETERS IN SearchTopicOut
class SearchTopicList(BaseModel):
    topics: List[SearchTopicOut]


# # THIS MODEL IS TO SHOW A LIST OF ALL TOPICS
class TopicList(BaseModel):
    topics: List[TopicOut]
