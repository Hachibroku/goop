import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Comments.css";

function Comments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { topicId } = useParams(); // Retrieve topicId from URL params

  useEffect(() => {
    // Fetch comments from the API
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
  }, [topicId]); // Run this effect whenever topicId changes

  const handlePostComment = async () => {
    try {
      const response = await fetch("/api/topics/topic_id/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: currentUser,
          content: newComment,
        }),
      });

      if (response.ok) {
        // Reload comments or append the new comment to the list
        const updatedComments = [
          ...comments,
          { username: currentUser, content: newComment },
        ];
        setComments(updatedComments);
        setNewComment(""); // clear the text field
      } else {
        // Handle error
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("There was an error posting the comment", error);
    }
  };

  return (
    <div className="comment-section">
      {/* Section for posting a new comment */}
      <div className="new-comment">
        <h2>Post a Comment</h2>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
        ></textarea>
        <button onClick={handlePostComment}>Post Comment</button>
      </div>

      {/* Section for displaying existing comments */}
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
