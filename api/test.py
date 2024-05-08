from fastapi.testclient import TestClient
from queries.topics import CommentQueries
from .main import app

client = TestClient(app=app)


class FakeCommentQueries:
    def get_comments(self, username: str = None, topic_id: str = None):
        return [{"username": "swagman", "content": "test comment"}]

    def add_comment(self, topic_id: str, username: str, content: str):
        return {"id": 1, "name": name}


def test_get_comments():
    app.dependency_overrides[CommentQueries] = FakeCommentQueries

    res = client.get("/api/comments/")
    comments_result = {
        "comments": [{"username": "swagman", "content": "test comment"}]
    }
    assert res.status_code == 200
    assert res.json() == comments_result


def test_add_comment_to_topic()
