import React from "react";
import "../../App.css";
import Cards from "/app/src/MySrc/Cards";
import HeroSection from "/app/src/MySrc/HeroSection";
import Footer from "/app/src/MySrc/Footer";

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
