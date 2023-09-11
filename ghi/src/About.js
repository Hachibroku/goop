import "./About.css";

function AboutSection() {
  return (
    <>
      <div className="about-section">
        <h1>About Us</h1>
        <p className="about-us-text">
          As passionate gamers our goal was to establish a platform that allowed for both fun discussions
          over spicy topics, while also having a simplistic approval/disapproval system.  The topic
          changes every 24 hours so that users can look forward to the next hot take in gaming.
        </p>
      </div>
      <h2 className="header-white">Our Team</h2>


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
              <h2 className="fullname">Murphey Osmundson</h2>
              <p className="title">Full-Stack Developer</p>
              <p className="title">CEO &amp; Founder</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <div className="icon-container">
                <a href={`https://www.linkedin.com/in/YOURLINKEDURL`} target="_blank">
                  <img
                    className="icon"
                    src="LINKEDICON.png"
                    alt="Icon 1"
                  />
                </a>
                <a href={`mailto:YOUREMAIL@DOMAIN`} target="_blank">
                  <img
                    className="icon"
                    src="MAILICON.png"
                    alt="Icon 2"
                  />
                </a>
                <a href={`https://gitlab.com/YOURGITLABURL`} target="_blank">
                  <img
                    className="icon"
                    src="GITLABICON.png"
                    alt="Icon 3"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>


        <div className="column">
          <div className="card">
            <img
              className="picture"
              src="Aleximage.jpg"
              alt="Alex Natavio"
              style={{ resizeMode: "contain", width: "100%" }}
            />
            <div className="container">
              <h2 className="fullname">Alex Natavio</h2>
              <p className="title">Full-Stack Developer</p>
              <p className="title">Front-End Designer</p>
              <p>Front end development enthusiast and League of Legends enjoyer.</p>
              <div className="icon-container">
                <a href={`https://www.linkedin.com/in/alex-natavio`} target="_blank">
                  <img
                    className="icon"
                    src="LINKEDICON.png"
                    alt="Icon 1"
                  />
                </a>
                <a href={`mailto:alex.natavio@gmail.com`} target="_blank">
                  <img
                    className="icon"
                    src="MAILICON.png"
                    alt="Icon 2"
                  />
                </a>
                <a href={`https://gitlab.com/alexnatavio`} target="_blank">
                  <img
                    className="icon"
                    src="GITLABICON.png"
                    alt="Icon 3"
                  />
                </a>
              </div>
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
              <h2 className="fullname">Sung Hong</h2>
              <p className="title">Full-Stack Developer</p>
              <p className="title">Back-End Designer</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <div className="icon-container">
                <a href={`https://www.linkedin.com/in/YOURLINKEDURL`} target="_blank">
                  <img
                    className="icon"
                    src="LINKEDICON.png"
                    alt="Icon 1"
                  />
                </a>
                <a href={`mailto:YOUREMAIL@DOMAIN`} target="_blank">
                  <img
                    className="icon"
                    src="MAILICON.png"
                    alt="Icon 2"
                  />
                </a>
                <a href={`https://gitlab.com/YOURGITLABURL`} target="_blank">
                  <img
                    className="icon"
                    src="GITLABICON.png"
                    alt="Icon 3"
                  />
                </a>
              </div>
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
              <h2 className="fullname">Luis Santana</h2>
              <p className="title">Full-Stack Developer</p>
              <p className="title">Front-End Designer</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <div className="icon-container">
                <a href={`https://www.linkedin.com/in/YOURLINKEDURL`} target="_blank">
                  <img
                    className="icon"
                    src="LINKEDICON.png"
                    alt="Icon 1"
                  />
                </a>
                <a href={`mailto:YOUREMAIL@DOMAIN`} target="_blank">
                  <img
                    className="icon"
                    src="MAILICON.png"
                    alt="Icon 2"
                  />
                </a>
                <a href={`https://gitlab.com/YOURGITLABURL`} target="_blank">
                  <img
                    className="icon"
                    src="GITLABICON.png"
                    alt="Icon 3"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default AboutSection;
