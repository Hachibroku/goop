import pytest
from fastapi.testclient import TestClient
from main import app
from queries.topics import CommentQueries
from bson import ObjectId

client = TestClient(app)


@pytest.fixture(scope="module")
def test_topic_id():
    return str(ObjectId())


def test_add_comment(test_topic_id):
    comment_request = {
        "username": "test_user",
        "content": "This is a test comment.",
    }

    response = client.post(
        f"/api/topics/{test_topic_id}/comment", json=comment_request
    )

    assert response.status_code == 200
    assert response.json() == {"message": "Comment added successfully."}

    comment_queries = CommentQueries()
    topic = comment_queries.collection.find_one(
        {"_id": ObjectId(test_topic_id)}
    )
    assert topic is not None
    assert any(
        comment["username"] == "test_user"
        and comment["content"] == "This is a test comment."
        for comment in topic.get("comments", [])
    )
