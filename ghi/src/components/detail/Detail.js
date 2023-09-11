import React from "react";
import "./Detail.css";
import TopicDetail from "./TopicDetail";
import Comments from "./Comments";
import Footer from "../mainpage/Footer";

function Detail() {
  return (
    <>
      <TopicDetail />
      <Comments />
      <Footer />
    </>
  );
}

export default Detail;
