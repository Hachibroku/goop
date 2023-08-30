import React from "react";
import "./comments.css";
import TopicSection from "/app/src/MySrc/TopicSection";
import Footer from "/app/src/MySrc/Footer";
import CommentForm from "./CommentForm";

const oldcomments = () => {
  return (
    <div className="container mt-3 d-flex justify-content-center">
      <div>
        <>
          <TopicSection />
        </>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <div className="card p-3 mb-2">
            <div className="d-flex flex-row">
              <img
                src="Murpheyimage.png"
                height={40}
                width={40}
                className="rounded-circle"
              />
              <div className="d-flex flex-column ms-2">
                <h6 className="mb-1 text-primary">MURPHEY</h6>
                <p className="comment-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  lectus nibh, efficitur in bibendum id, pellentesque quis nibh.
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row gap-3 align-items-center">
                <div className="d-flex align-items-center">
                  <i className="fa fa-heart-o" />
                  <span className="ms-1 fs-10">Like</span>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row">
              <span className="text-muted fw-normal fs-10">
                August 24,2023 12:00 PM
              </span>
            </div>
          </div>
        </div>
        <div className="Input-Container">
          <>
            <CommentForm />
          </>
          <h3>Comment</h3>
          <textarea />
          <button>Submit</button>
        </div>
        <div className="comment_footer">
          <>
            <Footer />
          </>
        </div>
      </div>
    </div>
  );
};

export default oldcomments;



.row{
    background-color: #423449;
}
.card{
    box-shadow: 0 20px 500px rgba(113, 52, 52, 0.03);
    padding: 2%;
    margin-bottom: 1%;
    margin-left: 10%;
    margin-right: 10%;
}

.comment-text{
    font-size:12px;
}

.fs-10{
    font-size:12px;

}

.comment_footer {
    width: 100%;

}
