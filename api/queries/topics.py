from fastapi import HTTPException, status
from .client import Queries
from models.topics import TopicIn, TopicOut, Voting, CommentOut
from queries.accounts import AccountQueries
from bson import ObjectId
from typing import List
import random


class DuplicateTopicError(ValueError):
    pass


class TopicQueries(Queries):
    DB_NAME = "module3-project-gamma-mongo"
    COLLECTION = "topics"

    def create_topic(self, topic: TopicIn) -> TopicOut:
        props = topic.dict()
        props["voting"] = Voting(
            username=[], agree_count=0, disagree_count=0
        ).dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return TopicOut(**props)

    def get_topic(self, identifier: str, by: str = "title") -> List[TopicOut]:
        single_topic = []

        query = (
            {"title": identifier}
            if by == "title"
            else {"_id": ObjectId(identifier)}
        )

        document = self.collection.find_one(query)

        if document:
            document["id"] = str(document["_id"])
            single_topic.append(TopicOut(**document))
        return single_topic

    def get_topic_by_id(self, topic_id: str) -> TopicOut:
        document = self.collection.find_one({"_id": ObjectId(topic_id)})
        if not document:
            raise HTTPException(status_code=404, detail="Topic not found")
        document["id"] = str(document["_id"])
        return TopicOut(**document)

    def get_all_topics(self) -> List[TopicOut]:
        topics = []
        for document in self.collection.find():
            document["id"] = str(document["_id"])
            topics.append(TopicOut(**document))
        return topics

    def update_topic(self, topic_id: str, updated_topic: TopicIn) -> TopicOut:
        topic_id = ObjectId(topic_id)
        result = self.collection.update_one(
            {"_id": topic_id},
            {"$set": updated_topic.dict()},
        )
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Topic with id {topic_id} not found",
            )
        updated_topic = self.collection.find_one({"_id": topic_id})
        updated_topic["id"] = str(updated_topic["_id"])
        return TopicOut(**updated_topic)

    def delete_topic(self, topic_id: str):
        topic_id = ObjectId(topic_id)
        result = self.collection.delete_one({"_id": topic_id})
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Topic with id {topic_id} not found",
            )

    def get_all_topics(self) -> List[TopicOut]:
        topics = []
        for document in self.collection.find():
            document["id"] = str(document["_id"])
            topics.append(TopicOut(**document))
        return topics

    # def get_topic_of_the_day(self) -> TopicOut:
    #     unused_topics = list(
    #         self.collection.find({"used_as_topic_of_the_day": False})
    #     )
    #     if not unused_topics:
    #         raise HTTPException(
    #             status_code=404, detail="No unused topics found"
    #         )
    #     chosen_topic = random.choice(unused_topics)
    #     chosen_topic_id = chosen_topic["_id"]
    #     self.collection.update_one(
    #         {"_id": chosen_topic_id},
    #         {"$set": {"used_as_topic_of_the_day": True}},
    #     )
    #     chosen_topic["id"] = str(chosen_topic_id)
    #     return TopicOut(**chosen_topic)

    def get_topic_of_the_day(self) -> TopicOut:
        all_topics = list(self.collection.find())
        if not all_topics:
            raise HTTPException(status_code=404, detail="No topics found")
        chosen_topic = random.choice(all_topics)
        chosen_topic_id = chosen_topic["_id"]
        chosen_topic["id"] = str(chosen_topic_id)
        chosen_topic["id"] = str(chosen_topic_id)
        return TopicOut(**chosen_topic)
        # self.collection.update_one(
        #     {"_id": chosen_topic_id},
        #     {"$set": {"used_as_topic_of_the_day": True}},
        # )


class VotingQueries(Queries):
    DB_NAME = "module3-project-gamma-mongo"
    COLLECTION = "topics"

    def record_vote(self, topic_id: str, username: str, vote_type: str):
        topic = self.collection.find_one({"_id": ObjectId(topic_id)})
        # changed to "_id" bc "id" does not exist in our database
        if not topic:
            raise ValueError(f"No topic found with id: {topic_id}")

        voting_data = topic.get("voting")
        if not voting_data:
            voting_data = {
                "user_votes": {},
                "agree_count": 0,
                "disagree_count": 0,
            }

        if username in voting_data["user_votes"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with username: {username} has already voted.",
            )

        # Recording the vote
        voting_data["user_votes"][username] = vote_type
        if vote_type == "agree":
            voting_data["agree_count"] += 1
        elif vote_type == "disagree":
            voting_data["disagree_count"] += 1
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid vote_type: {vote_type}. Expected 'agree' or 'disagree'.",
            )

        self.collection.update_one(
            {"_id": ObjectId(topic_id)}, {"$set": {"voting": voting_data}}
        )

    def get_voting_data(self, topic_id: str) -> Voting:
        topic = self.collection.find_one({"_id": ObjectId(topic_id)})
        if not topic:
            raise ValueError(f"No topic found with id: {topic_id}")

        voting_data = topic.get("voting")
        if not voting_data:
            raise ValueError(
                f"No voting data found for topic with id: {topic_id}"
            )
        if "user_votes" not in voting_data:
            voting_data["user_votes"] = {}
        if "agree_count" not in voting_data:
            voting_data["agree_count"] = 0
        if "disagree_count" not in voting_data:
            voting_data["disagree_count"] = 0

        return Voting(**voting_data)

    def update_vote(self, topic_id: str, username: str, vote_type: str):
        topic = self.collection.find_one({"_id": ObjectId(topic_id)})
        if not topic:
            raise ValueError(f"No topic found with id: {topic_id}")

        voting_data = topic.get("voting")
        if not voting_data:
            raise ValueError(
                f"No voting data found for topic with id: {topic_id}"
            )

        # Check if the user has previously voted
        if username not in voting_data["user_votes"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with id: {username} hasn't voted yet.",
            )

        # Adjust the count based on the old vote
        previous_vote = voting_data["user_votes"][username]
        if previous_vote == "agree":
            voting_data["agree_count"] -= 1
        else:
            voting_data["disagree_count"] -= 1

        # Record the new vote
        voting_data["user_votes"][username] = vote_type
        if vote_type == "agree":
            voting_data["agree_count"] += 1
        elif vote_type == "disagree":
            voting_data["disagree_count"] += 1
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid vote_type: {vote_type}. Expected 'agree' or 'disagree'.",
            )

        self.collection.update_one(
            {"_id": ObjectId(topic_id)}, {"$set": {"voting": voting_data}}
        )

    def delete_vote(self, topic_id: str, username: str):
        topic = self.collection.find_one({"_id": ObjectId(topic_id)})
        if not topic:
            raise ValueError(f"No topic found with id: {topic_id}")

        voting_data = topic.get("voting")
        if not voting_data:
            raise ValueError(
                f"No voting data found for topic with id: {topic_id}"
            )

        # Check if the user has previously voted
        if username not in voting_data["user_votes"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with id: {username} hasn't voted yet.",
            )

        # Adjust the count based on the user's vote before deletion
        user_vote = voting_data["user_votes"].pop(username)
        if user_vote == "agree":
            voting_data["agree_count"] -= 1
        else:
            voting_data["disagree_count"] -= 1

        self.collection.update_one(
            {"_id": ObjectId(topic_id)}, {"$set": {"voting": voting_data}}
        )


class CommentQueries(Queries):
    DB_NAME = "module3-project-gamma-mongo"
    COLLECTION = "topics"

    def add_comment(self, topic_id: str, username: str, content: str):
        topic_id = ObjectId(topic_id)
        topic = self.collection.find_one({"_id": topic_id})

        if topic is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Topic with id {topic_id} not found",
            )

        comments_data = topic.get("comments", [])
        comments = [
            CommentOut(**comment_data) for comment_data in comments_data
        ]

        # Check if user already commented
        if any(comment.username == username for comment in comments):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with id {username} has already commented.",
            )

        new_comment = CommentOut(username=username, content=content)
        comments.append(new_comment)

        self.collection.update_one(
            {"_id": topic_id},
            {"$set": {"comments": [comment.dict() for comment in comments]}},
        )

    def get_comments(self, username: str = None, topic_id: str = None):
        query = {}
        if username:
            query["comments.username"] = username
        if topic_id:
            query["_id"] = ObjectId(topic_id)

        topics_with_comments = self.collection.find(query, {"comments": 1})

        # Extract comments and possibly filter them more
        all_comments = []
        for topic in topics_with_comments:
            comments = topic.get("comments", [])
            all_comments.extend(
                [CommentOut(**comment_data) for comment_data in comments]
            )

        return all_comments

    def update_comment(self, topic_id: str, username: str, new_content: str):
        result = self.collection.update_one(
            {"_id": ObjectId(topic_id), "comments.username": username},
            {"$set": {"comments.$.content": new_content}},
        )
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Comment by user {username} in topic {topic_id} not found.",
            )

    def delete_comment(self, topic_id: str, username: str):
        result = self.collection.update_one(
            {"_id": ObjectId(topic_id)},
            {"$pull": {"comments": {"username": username}}},
        )
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Comment by user {username} in topic {topic_id} not found.",
            )
