import React, { useState, fetch } from "react";

const CommentForm = () => {
  const [comment, setComment] = useState("");

  async function submit(e) {
    e.preventDefault()
    try{

    }
    catch(e){
      console.log(e)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://api/topics/{topic_id}/comment`, {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.status === 200) {
      return "The comment was successfully submitted."
    } else {
      return "An error occurred when submitting a comment."
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="comment-form-textarea"
        name="comment"
        value={comment}
      />
      <button className="comment-form-button">Submit</button>
    </form>
  );
};

export default CommentForm;
