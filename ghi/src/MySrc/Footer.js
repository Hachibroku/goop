import React from "react";
import "./Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          To get the info about all the latest videogame topics be sure to
          subscribe
        </p>
        <div className="input-areas">
          <form>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
            />
            <Button buttonStyle="btn--outline">Subscribe</Button>
          </form>
        </div>
      </section>
      <div class="footer-links">
        <div className="footer-link-wrapper">
          <div class="footer-link-items">
            <h2>Contact Us</h2>
            <Link to="/about">Contact</Link>
            <Link to="/main">Support</Link>
            <Link to="/main">Destinations</Link>
            <Link to="/main">Sponsorships</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div class="footer-link-items">
            <h2>Social Media</h2>
            <Link to="/main">Instagram</Link>
            <Link to="/main">Facebook</Link>
            <Link to="/main">Youtube</Link>
            <Link to="/main">Twitter</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
