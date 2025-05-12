import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import TabTitle from "../components/titles/TabTitle";

const About = () => {
  document.title = "About Us";
  return (
    <>
      <Navbar />
      <div className="about-page main-page padding-page">
        <TabTitle title={"About Us"} />
        <div className="aboutus-container">
          <div className="aboutus-section p20">
            <h1>Tea Time Telugu</h1>
            <div className="aboutus-flex">
              <div>
                <p>
                  Tea Time Telugu, established in December 2024, began as a
                  dedicated platform for news and entertainment tailored to the
                  Telugu-speaking audience. Over the years, it has transformed
                  into a go-to destination for round-the-clock updates, becoming
                  a trusted name for entertainment news and insights.
                </p>

                <p>
                  The platform covers a diverse range of content that keeps
                  readers informed and entertained. From breaking news and
                  trending topics to in-depth film reviews and award-season
                  highlights, Tea Time Telugu caters to every reader’s
                  interests. It also features exclusive celebrity interviews,
                  updates on OTT releases, analyses of political and social
                  topics, and vibrant photo galleries capturing film events and
                  candid moments of stars. With regular updates in the regional
                  language Telugu, it connects deeply with its audience while
                  ensuring accessibility.
                </p>
                <p>
                  Behind the scenes, a passionate team of writers and technical
                  experts works tirelessly to deliver engaging, high-quality
                  stories that resonate with readers. Tea Time Telugu is more
                  than just a news site—it’s a platform that informs, inspires,
                  and entertains its growing audience every day.
                </p>
                <p>Happy reading!</p>
                <p>— Team Tea Time Telugu</p>
              </div>
              <img src="/assets/new-ttt-logo.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
