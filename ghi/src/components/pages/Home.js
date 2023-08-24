import React from "react";
import "../../App.css";
import Cards from "/app/src/MySrc/Cards";
import TopicSection from "/app/src/MySrc/TopicSection";
import Footer from "/app/src/MySrc/Footer";

function Home() {
  return (
    <>
      <TopicSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
