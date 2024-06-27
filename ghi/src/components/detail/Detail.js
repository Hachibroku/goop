import React from "react";
import TopicDetail from "./TopicDetail";
import Comments from "./Comments";
import Footer from "../mainpage/Footer";

function Detail({ currentUser }) {
  return (
    <>
      <TopicDetail />
      <Comments currentUser={currentUser} />
      <Footer />
    </>
  );
}

export default Detail;
