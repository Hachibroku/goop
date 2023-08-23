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
            user_id=0, agree_count=0, disagree_count=0
        ).dict()  # Initialize voting
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return TopicOut(**props)

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

    def record_vote(self, topic_id: str, user_id: int, vote_type: str):
        topic = self.collection.find_one({"id": topic_id})
        voting = topic.get("voting", Voting(agree_count=0, disagree_count=0))

        if vote_type == "agree":
            voting.agree_count += 1
        elif vote_type == "disagree":
            voting.disagree_count += 1

        self.collection.update_one(
            {"id": topic_id},
            {"$set": {"voting": voting.dict()}},
        )
