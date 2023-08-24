import React from "react";
import "./comments.css";
import TopicSection from "/app/src/MySrc/TopicSection";
import Footer from "/app/src/MySrc/Footer";

function Comments() {
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
              <div className="d-flex flex-row">
                <span className="text-muted fw-normal fs-10">
                  August 24,2023 12:00 PM
                </span>
              </div>
            </div>
          </div>
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
              <div className="d-flex flex-row">
                <span className="text-muted fw-normal fs-10">
                  August 24,2023 12:00 PM
                </span>
              </div>
            </div>
          </div>
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
              <div className="d-flex flex-row">
                <span className="text-muted fw-normal fs-10">
                  August 24,2023 12:00 PM
                </span>
              </div>
            </div>
          </div>
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
              <div className="d-flex flex-row">
                <span className="text-muted fw-normal fs-10">
                  August 24,2023 12:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="comment_footer">
        <>
          <Footer />
        </>
      </div>
    </div>
  );
}

export default Comments;
