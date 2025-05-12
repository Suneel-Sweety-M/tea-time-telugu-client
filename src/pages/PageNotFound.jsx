import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const PageNotFound = () => {
  return (
    <>
    <Navbar />
    <div className="page-not-found main-page main-padding">
      <div className="error-container">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="error-actions">
          <Link to="/" className="action-button home-button">
            <FaHome className="button-icon" />
            Go to Homepage
          </Link>
          <Link to="/search" className="action-button search-button">
            <FaSearch className="button-icon" />
            Try Searching
          </Link>
        </div>
        
        <div className="error-image">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-114.7 0-208-93.3-208-208S141.3 48 256 48s208 93.3 208 208-93.3 208-208 208zm-80-296c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-52.9 0-96 43.1-96 96 0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16 0-52.9-43.1-96-96-96z"/>
          </svg>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default PageNotFound;