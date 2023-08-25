from fastapi import HTTPException, status
from .client import Queries
from models.topics import TopicIn, TopicOut, Voting, SearchTopicOut
from bson.objectid import ObjectId
from typing import List


class DuplicateTopicError(ValueError):
    pass


class TopicQueries(Queries):
    DB_NAME = "module3-project-gamma-mongo-1"
    COLLECTION = "topics"

    def create(self, topic: TopicIn) -> TopicOut:
        props = topic.dict()
        props["voting"] = Voting(
            user_ids=[],
            agree_count=0,
            disagree_count=0,
        ).dict()  # Initialize voting
        inserted = self.collection.insert_one(props)
        inserted_id_str = str(inserted.inserted_id)
        return TopicOut(id=inserted_id_str, **props)
        # props["id"] = str(props["_id"])
        # return TopicOut(**props)

    def get_topic(self, title: str) -> List[TopicOut]:
        topic = self.collection.find_one({"title": title})
        if topic is None:
            return []
        topic["id"] = str(topic["_id"])
        return [TopicOut(**topic)]
        # single_topic = []
        # db = self.collection.find_one({"title": title})
        # for document in db:
        #     document["id"] = str(document["_id"])
        #     single_topic.append(TopicOut(**document))
        # return single_topic

    def record_vote(self, topic_id: str, user_id: str, vote_type: str):
        topic = self.collection.find_one({"_id": ObjectId(topic_id)})
        # changed to "_id" bc "id" does not exist in our database
        if not topic:
            raise ValueError(f"No topic found with id: {topic_id}")
        voting_data = topic.get("voting")
        if voting_data:
            voting = Voting(**voting_data)
        else:
            voting = Voting(user_ids=[], agree_count=0, disagree_count=0)

        # topic.get(
        #     "voting", {"agree_count": 0, "disagree_count": 0, "user_ids": []}
        # )
        if user_id in voting.user_ids:
            # changed to in for list
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with id: {user_id} has already voted.",
            )
            # created error code for checking user_id if it has voted or not
        if vote_type == "agree":
            # voting["agree_count"] += 1
            voting.agree_count += 1
            print("agree")
        elif vote_type == "disagree":
            # voting["disagree_count"] += 1
            voting.disagree_count += 1
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid vote_type: {vote_type}. Expected 'agree' or 'disagree'.",
            )

        voting.user_ids.append(user_id)

        self.collection.update_one(
            {"_id": ObjectId(topic_id)},
            {"$set": {"voting": voting.dict()}},
        )
