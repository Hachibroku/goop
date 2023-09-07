from fastapi import HTTPException, status
from .client import Queries
from models.topics import TopicIn, TopicOut, Voting, Comment
from bson import ObjectId
from typing import List


class DuplicateTopicError(ValueError):
    pass


class TopicQueries(Queries):
    DB_NAME = "module3-project-gamma-mongo"
    COLLECTION = "topics"

    def create_topic(self, topic: TopicIn) -> TopicOut:
        props = topic.dict()
        props["voting"] = Voting(
            user_id=[], agree_count=0, disagree_count=0
        ).dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return TopicOut(**props)

    def get_topic(self, title: str) -> List[TopicOut]:
        single_topic = []
        document = self.collection.find_one({"title": title})
        if document:
            document["id"] = str(document["_id"])
            single_topic.append(TopicOut(**document))
        return single_topic

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

    def get_topic_of_the_day(self) -> TopicOut:
        unused_topics = list(
            self.collection.find({"used_as_topic_of_the_day": False})
        )
        if not unused_topics:
            raise HTTPException(
                status_code=404, detail="No unused topics found"
            )
        chosen_topic = random.choice(unused_topics)
        chosen_topic_id = chosen_topic["_id"]
        self.collection.update_one(
            {"_id": chosen_topic_id},
            {"$set": {"used_as_topic_of_the_day": True}},
        )
        chosen_topic["id"] = str(chosen_topic_id)
        return TopicOut(**chosen_topic)


class VotingQueries(Queries):
    DB_NAME = "module3-project-gamma-mongo"
    COLLECTION = "topics"

    def record_vote(self, topic_id: str, user_id: str, vote_type: str):
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

        if user_id in voting_data["user_votes"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with id: {user_id} has already voted.",
            )

        # Recording the vote
        voting_data["user_votes"][user_id] = vote_type
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

    def update_vote(self, topic_id: str, user_id: str, vote_type: str):
        topic = self.collection.find_one({"_id": ObjectId(topic_id)})
        if not topic:
            raise ValueError(f"No topic found with id: {topic_id}")

        voting_data = topic.get("voting")
        if not voting_data:
            raise ValueError(
                f"No voting data found for topic with id: {topic_id}"
            )

        # Check if the user has previously voted
        if user_id not in voting_data["user_votes"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with id: {user_id} hasn't voted yet.",
            )

        # Adjust the count based on the old vote
        previous_vote = voting_data["user_votes"][user_id]
        if previous_vote == "agree":
            voting_data["agree_count"] -= 1
        else:
            voting_data["disagree_count"] -= 1

        # Record the new vote
        voting_data["user_votes"][user_id] = vote_type
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

    def delete_vote(self, topic_id: str, user_id: str):
        topic = self.collection.find_one({"_id": ObjectId(topic_id)})
        if not topic:
            raise ValueError(f"No topic found with id: {topic_id}")

        voting_data = topic.get("voting")
        if not voting_data:
            raise ValueError(
                f"No voting data found for topic with id: {topic_id}"
            )

        # Check if the user has previously voted
        if user_id not in voting_data["user_votes"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with id: {user_id} hasn't voted yet.",
            )

        # Adjust the count based on the user's vote before deletion
        user_vote = voting_data["user_votes"].pop(user_id)
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

    def add_comment(self, topic_id: str, user_id: str, content: str):
        topic_id = ObjectId(topic_id)
        topic = self.collection.find_one({"_id": topic_id})

        if topic is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Topic with id {topic_id} not found",
            )

        comments_data = topic.get("comments", [])
        comments = [Comment(**comment_data) for comment_data in comments_data]

        # Check if user already commented
        if any(comment.user_id == user_id for comment in comments):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with id {user_id} has already commented.",
            )

        new_comment = Comment(user_id=user_id, content=content)
        comments.append(new_comment)

        self.collection.update_one(
            {"_id": topic_id},
            {"$set": {"comments": [comment.dict() for comment in comments]}},
        )

    def get_comments(self, user_id: str = None, topic_id: str = None):
        query = {}
        if user_id:
            query["comments.user_id"] = user_id
        if topic_id:
            query["_id"] = ObjectId(topic_id)

        topics_with_comments = self.collection.find(query, {"comments": 1})

        # Extract comments and possibly filter them more
        all_comments = []
        for topic in topics_with_comments:
            comments = topic.get("comments", [])
            all_comments.extend(comments)

        return all_comments

    def update_comment(self, topic_id: str, user_id: str, new_content: str):
        result = self.collection.update_one(
            {"_id": ObjectId(topic_id), "comments.user_id": user_id},
            {"$set": {"comments.$.content": new_content}},
        )
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Comment by user {user_id} in topic {topic_id} not found.",
            )

    def delete_comment(self, topic_id: str, user_id: str):
        result = self.collection.update_one(
            {"_id": ObjectId(topic_id)},
            {"$pull": {"comments": {"user_id": user_id}}},
        )
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Comment by user {user_id} in topic {topic_id} not found.",
            )
