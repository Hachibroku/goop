import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Comments.css";

function Comments({ currentUser }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { topicId } = useParams();

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/comments?topic_id=${topicId}`
        );
        setComments(response.data.comments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    }

    fetchComments();
  }, [topicId]);
  const handlePostComment = async () => {
    try {
      console.log("Current User:", currentUser);
      console.log("New Comment:", newComment);

      const response = await fetch(
        `http://localhost:8000/api/topics/${topicId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic_id: topicId,
            username: currentUser,
            content: newComment,
          }),
        }
      );
        console.log("topic_id:", topicId)
        console.log("username:", currentUser)
        console.log("comment:", newComment)
      if (response.ok) {
        const updatedComments = [
          ...comments,
          { username: currentUser, content: newComment },
        ];
        setComments(updatedComments);
        setNewComment("");
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("There was an error posting the comment", error);
    }
  };

  return (
    <div className="comment-section">
      <div className="new-comment">
        <h2>Post a Comment</h2>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
        ></textarea>
        <button onClick={handlePostComment}>Post Comment</button>
      </div>

      <div className="existing-comments">
        <h2>Existing Comments</h2>
        {comments.map((comment, index) => (
          <div key={index} className="single-comment">
            <h3>{comment.username}</h3>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
