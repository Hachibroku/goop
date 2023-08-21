from .client import Queries
from api.models.topics import TopicIn, TopicOut, SearchTopicOut
from bson.objectid import ObjectId
from typing import List


class DuplicateTopicError(ValueError):
    pass


class AccountQueries(Queries):
    DB_NAME = "modjule3-project-gamma-db-1"
    COLLECTION = "topics"

    def create(self, topic: TopicIn) -> TopicOut:
        props = topic.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return TopicOut(**props)

    def get_topic(self, title: str) -> List[TopicOut]:
        single_topic = []
        db = self.collection.find_one({"title": title})
        for document in db:
            document["id"] = str(document["_id"])
            single_topic.append(TopicOut(**document))
        return single_topic
