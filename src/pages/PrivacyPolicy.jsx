import React from "react";
import Navbar from "../components/navbar/Navbar";
import TabTitle from "../components/titles/TabTitle";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  document.title = "Privacy Policy";

  return (
    <>
      <Navbar />
      <div className="privacy-page main-page padding-page">
        <TabTitle title={"Privacy Policy"} />
        <div className="privacy-container">
          <div className="privacy-section">
            <h1>Privacy Policy</h1>
            <p>
              Tea Time Telugu is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, and safeguard your
              information when you use our website and services. By accessing or
              using our services, you agree to the terms outlined in this
              policy.
            </p>
          </div>
          <div className="privacy-section">
            <h2>1. Information We Collect</h2>
            <p>
              We collect the following information when you register using
              Google:
            </p>
            <ul className="pp-list">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Profile Picture</li>
            </ul>
            <p>This data is retrieved via Google OAuth when you sign in.</p>
          </div>
          <div className="privacy-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information collected to:</p>
            <ul className="pp-list">
              <li>Manage user login and logout functionalities.</li>
              <li>Enable users to post comments on articles.</li>
              <li>
                Facilitate user interactions, including reactions to posts.
              </li>
              <li>Improve our website and services.</li>
            </ul>
          </div>
          <div className="privacy-section">
            <h2>3. How We Protect Your Information</h2>
            <p>
              We take appropriate technical and organizational measures to
              secure your data against unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission
              over the internet or electronic storage is 100% secure.
            </p>
          </div>
          <div className="privacy-section">
            <h2>4. Sharing Your Information</h2>
            <p>
              We do not share, sell, rent, or trade your personal information
              with any third parties.
            </p>
          </div>
          <div className="privacy-section">
            <h2>5. Third-Party Services</h2>
            <p>
              Our application uses Google OAuth for user authentication. Your
              information is collected and processed by Google in accordance
              with Google’s Privacy Policy.
            </p>
          </div>
          <div className="privacy-section">
            <h2>6. Your Choices</h2>
            <p>
              You can choose not to provide us with your information by not
              registering or logging in using Google. However, certain features
              of our application may not be available without registration.
            </p>
          </div>
          <div className="privacy-section">
            <h2>7. Cookies and Tracking Technologies</h2>
            <p>
              We may use cookies or similar technologies to enhance your
              experience on our website. These cookies do not collect personal
              data.
            </p>
          </div>
          <div className="privacy-section">
            <h2>8. Children's Privacy</h2>
            <p>
              Our website is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children.
            </p>
          </div>
          <div className="privacy-section">
            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We reserve the right to update this Privacy Policy at any time.
              Changes will be effective immediately upon posting to our website.
              We encourage you to review this policy periodically.
            </p>
          </div>
          <div className="privacy-section">
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              please <Link to={"/contact-us"}><span style={{color:"blue"}}>contact us</span></Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
