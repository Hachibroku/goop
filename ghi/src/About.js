import "./About.css";

function AboutSection() {
  return (
    <>
      <div className="about-section">
        <h1>About Us Page</h1>
        <p>Some text about who we are and what we do.</p>
        <p>
          Resize the browser window to see that this page is responsive by the
          way.
        </p>
      </div>
      <h2 style={{ textAlign: "center" }}>Our Team</h2>
      <div className="row">
        <div className="column">
          <div className="card">
            <img
              className="picture"
              src="Murpheyimage.png"
              alt="Murphey Osmundson"
              style={{ width: "100%" }}
            />
            <div className="container">
              <h3>Murphey Osmundson</h3>
              <p className="title">Full-Stack Developer</p>
              <p className="title">CEO &amp; Founder</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>Murphey_Osmundson@email.com</p>
              <p>
                <button className="button">Contact</button>
              </p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <img
              className="picture"
              src="Murpheyimage.png"
              alt="Alex Natavio"
              style={{ resizeMode: "contain", width: "100%" }}
            />
            <div className="container">
              <h3>Alex Natavio</h3>
              <p className="title">Full-Stack Developer</p>
              <p className="title">Front-End Designer</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>Alex_Natavio@email.com</p>
              <p>
                <button className="button">Contact</button>
              </p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <img
              className="picture"
              src="Murpheyimage.png"
              alt="Sung Hong"
              style={{ resizeMode: "contain", width: "100%" }}
            />
            <div className="container">
              <h3>Sung Hong</h3>
              <p className="title">Full-Stack Developer</p>
              <p className="title">Back-End Designer</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>Sung_Hong@email.com</p>
              <p>
                <button className="button">Contact</button>
              </p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <img
              className="picture"
              src="Murpheyimage.png"
              alt="Luis Santana"
              style={{ resizeMode: "contain", width: "100%" }}
            />
            <div className="container">
              <h3>Luis Santana</h3>
              <p className="title">Full-Stack Developer</p>
              <p className="title">Designer</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>Luis_Santana@email.com</p>
              <p>
                <button className="button">Contact</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutSection;
