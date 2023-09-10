import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Comments.css";

function Comments() {
  const [comments, setComments] = useState([]);
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

  return (
    <div className="comments-container">
      <h2>Comments</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className="comment">
            <div className="comment-content">{comment.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
