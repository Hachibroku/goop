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
        # OLD CODE
        # if voting_data:
        #     voting = Voting(**voting_data)
        # else:
        #     voting = Voting(user_ids=[], agree_count=0, disagree_count=0)

        # if user_id in voting.user_ids:

        #     raise HTTPException(
        #         status_code=status.HTTP_400_BAD_REQUEST,
        #         detail=f"User with id: {user_id} has already voted.",
        #     )

        # if vote_type == "agree":

        #     voting.agree_count += 1
        #     print("agree")
        # elif vote_type == "disagree":

        #     voting.disagree_count += 1
        # else:
        #     raise HTTPException(
        #         status_code=status.HTTP_400_BAD_REQUEST,
        #         detail=f"Invalid vote_type: {vote_type}. Expected 'agree' or 'disagree'.",
        #     )

        # voting.user_ids.append(user_id)

        # self.collection.update_one(
        #     {"_id": ObjectId(topic_id)},
        #     {"$set": {"voting": voting.dict()}},
        # )

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

    # def update_vote(self, topic_id: str, user_id: str, new_vote_type: str):
    #     topic = self.collection.find_one({"_id": ObjectId(topic_id)})
    #     if not topic:
    #         raise ValueError(f"No topic found with id: {topic_id}")

    #     voting_data = topic.get("voting")
    #     if not voting_data:
    #         raise ValueError(
    #             f"No voting data found for topic with id: {topic_id}"
    #         )

    #     if user_id not in voting_data["user_ids"]:
    #         raise HTTPException(
    #             status_code=status.HTTP_400_BAD_REQUEST,
    #             detail=f"User with id: {user_id} has not voted yet.",
    #         )

    #     prev_vote_type = (
    #         "agree"
    #         if voting_data["agree_count"]
    #         > len(voting_data["user_ids"]) - voting_data["disagree_count"]
    #         else "disagree"
    #     )

    #     if prev_vote_type == new_vote_type:
    #         raise HTTPException(
    #             status_code=status.HTTP_400_BAD_REQUEST,
    #             detail=f"User with id: {user_id} has already voted '{new_vote_type}'.",
    #         )

    #     if new_vote_type == "agree":
    #         voting_data["agree_count"] += 1
    #         voting_data["disagree_count"] = max(
    #             voting_data["disagree_count"] - 1, 0
    #         )
    #     elif new_vote_type == "disagree":
    #         voting_data["disagree_count"] += 1
    #         voting_data["agree_count"] = max(voting_data["agree_count"] - 1, 0)
    #     else:
    #         raise HTTPException(
    #             status_code=status.HTTP_400_BAD_REQUEST,
    #             detail=f"Invalid vote_type: {new_vote_type}. Expected 'agree' or 'disagree'.",
    #         )

    #     self.collection.update_one(
    #         {"_id": ObjectId(topic_id)}, {"$set": {"voting": voting_data}}
    #     )

    # def delete_vote(self, topic_id: str, user_id: str):
    #     topic = self.collection.find_one({"_id": ObjectId(topic_id)})
    #     if not topic:
    #         raise ValueError(f"No topic found with id: {topic_id}")

    #     voting_data = topic.get("voting")
    #     if not voting_data:
    #         raise ValueError(
    #             f"No voting data found for topic with id: {topic_id}"
    #         )

    #     if user_id not in voting_data["user_ids"]:
    #         raise HTTPException(
    #             status_code=status.HTTP_400_BAD_REQUEST,
    #             detail=f"User with id: {user_id} has not voted yet.",
    #         )

    #     prev_vote_type = voting_data["user_votes"].get(user_id)

    #     if not prev_vote_type:
    #         raise HTTPException(
    #             status_code=status.HTTP_400_BAD_REQUEST,
    #             detail=f"User vote type not found. Data inconsistency.",
    #         )

    #     if prev_vote_type == "agree":
    #         voting_data["agree_count"] = max(voting_data["agree_count"] - 1, 0)
    #     elif prev_vote_type == "disagree":
    #         voting_data["disagree_count"] = max(
    #             voting_data["disagree_count"] - 1, 0
    #         )

    #     voting_data["user_ids"].remove(user_id)
    #     del voting_data["user_votes"][user_id]

    #     self.collection.update_one(
    #         {"_id": ObjectId(topic_id)}, {"$set": {"voting": voting_data}}
    #     )
