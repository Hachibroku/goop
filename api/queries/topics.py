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

    def create(self, topic: TopicIn) -> TopicOut:
        props = topic.dict()
        props["voting"] = Voting(
            user_id=[], agree_count=0, disagree_count=0
        ).dict()  # Initialize voting
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

    def record_vote(self, topic_id: str, user_id: str, vote_type: str):
        topic_id = ObjectId(topic_id)
        topic = self.collection.find_one({"_id": topic_id})
        print(f"Debugging: topic_id = {topic_id}, topic = {topic}")
        if topic is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Topic with id {topic_id} not found",
            )
        # user_id = ObjectId(user_id) this will probably be required later
        voting_data = topic.get("voting")
        if voting_data:
            voting = Voting(**voting_data)
        else:
            voting = Voting(user_id="", agree_count=0, disagree_count=0)

        if user_id in voting.user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with id: {user_id} has already voted.",
            )

        elif user_id not in voting.user_id:
            voting.user_id.append(user_id)

            if vote_type == "agree":
                voting.agree_count += 1
            elif vote_type == "disagree":
                voting.disagree_count += 1
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Invalid vote_type: {vote_type}. Expected 'agree' or 'disagree'.",
                )

            self.collection.update_one(
                {"_id": topic_id},
                {"$set": {"voting": voting.dict()}},
            )
        # 400 error works but not getting proper detail message in swagger
        # below is my original code, above is alternate
        # both work for the error but not the message
        # else:
        #     detail_message = (
        #         "User with id {user_id} has already voted.".format(user_id)
        #     )
        #     print(
        #         f"Debugging: Detail message is {detail_message}"
        #     )  # Debugging line to print the detail message
        #     raise HTTPException(
        #         status_code=status.HTTP_400_BAD_REQUEST, detail=detail_message
        #     )

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

    # Update a comment by user_id and topic_id
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

    # Delete a comment by user_id and topic_id
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
