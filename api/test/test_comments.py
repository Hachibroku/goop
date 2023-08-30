import unittest
from api.models.topics import Comment
from api.queries.topics import CommentQueries
from api.routers.topics import (
    add_comment_to_topic,
    get_comments,
    update_comment,
    delete_comment,
)


class TestComments(unittest.TestCase):
    def setUp(self):
        self.comment_queries = CommentQueries()
        self.db_name = CommentQueries.DB_NAME
        self.comment1 = Comment(
            user_id="john", comment_text="This is a comment"
        )
        self.comment2 = Comment(
            user_id="jane", comment_text="This is another comment"
        )

    def test_comments(self):
        # Using CommentQueries instance to add comments
        self.comment_queries.add_comment(
            "some_topic_id", self.comment1.user_id, self.comment1.comment_text
        )
        self.comment_queries.add_comment(
            "some_topic_id", self.comment2.user_id, self.comment2.comment_text
        )

        # Your function should return a list, let's check that
        result = self.comment_queries.get_comments(topic_id="some_topic_id")
        self.assertIsInstance(result, list)

        # If the list is not empty, it should contain Comment objects
        if result:
            self.assertIsInstance(result[0], Comment)

        # Let's check whether the comments are present in the list
        self.assertIn(self.comment1, result)
        self.assertIn(self.comment2, result)

        # Update a comment and check it's updated in the list
        self.comment_queries.update_comment(
            "some_topic_id",
            self.comment1.user_id,
            "This is a modified comment",
        )
        modified_comment1 = Comment(
            user_id="john", comment_text="This is a modified comment"
        )
        self.assertIn(
            modified_comment1,
            self.comment_queries.get_comments(topic_id="some_topic_id"),
        )

        # Delete a comment and check it's removed from the list
        self.comment_queries.delete_comment(
            "some_topic_id", self.comment1.user_id
        )
        self.assertNotIn(
            modified_comment1,
            self.comment_queries.get_comments(topic_id="some_topic_id"),
        )


if __name__ == "__main__":
    unittest.main()
