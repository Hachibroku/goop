import pytest
from api.models.topics import Voting
from api.queries.topics import VotingQueries
from api.routers.topics import record_vote
from fastapi import HTTPException


class TestVoting:
    def test_voting_model(self):
        voting = Voting()
        assert voting.user_votes == {}
        assert voting.agree_count == 0
        assert voting.disagree_count == 0

    def test_voting_queries(self, mocker):
        mock_collection = mocker.patch(
            "api.queries.topics.VotingQueries.collection"
        )
        mock_collection.find_one.return_value = {
            "_id": "some_id",
            "voting": {
                "user_votes": {},
                "agree_count": 0,
                "disagree_count": 0,
            },
        }
        queries = VotingQueries()
        queries.record_vote("some_id", "user1", "agree")
        mock_collection.find_one.assert_called_once_with({"_id": "some_id"})

    def test_record_vote_router(self, mocker):
        mock_queries = mocker.patch("api.queries.topics.VotingQueries")
        mock_queries.record_vote.return_value = None
        result = record_vote("some_id", "user1", "agree")
        assert result is None

        mock_queries.record_vote.side_effect = Exception("Error occurred")
        with pytest.raises(HTTPException) as exc_info:
            record_vote("some_id", "user1", "agree")
        assert exc_info.value.status_code == 400
        assert str(exc_info.value.detail) == "Error occurred"
