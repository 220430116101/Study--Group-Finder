import React from "react";
import { Link } from "react-router-dom"; // If using React Router
import "./Home.css";

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="https://icon-library.com/images/group-study-icon/group-study-icon-25.jpg" alt="StudyGroup Finder" />
          StudyGroup Finder
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/group">Group</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
        </ul>
      </nav>

      {/* Main Header */}
      <header className="main-header">
        <div className="header-buttons">
          <button className="sign-in-btn"><Link to="/signup">Sign up</Link></button>
          <button className="sign-in-btn"><Link to="/signin">Sign in</Link></button>
        </div>
        <div className="header-content">
          <h1>Grow smarter together</h1>
          <p>Find top-rated study notes from students taking the same courses as you.</p>
          <div className="search-container">
            <input type="text" placeholder="Search for courses, books or documents" className="search-input" />
            <Link to="/search"><button className="search-btn">🔍</button></Link>
          </div>
        </div>
      </header>

      {/* Statistics Section */}
      <section className="stats">
        <h2>8M students and faculty members saved, and counting</h2>
        <p>50K new study notes added every day, from the world's most active student communities</p>
        <div className="stat-grid">
          <div className="stat-item">
            <h3>1M+</h3>
            <p>📚 Study resources</p>
          </div>
          <div className="stat-item">
            <h3>6M</h3>
            <p>👥 Users</p>
          </div>
        </div>
      </section>

      {/* Best Study Group Section */}
      <section className="best-section">
        <h2>Only the best for the best</h2>
        <p>Find the best study group to ace your way through education.</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Study Group Finder: Your go-to platform for connecting with fellow students and collaborating effectively.</p>
        <p>&copy; 2025 Study Group Finder. All rights reserved. | VAT: 123456789 | Company Registration: 987654321</p>
      </footer>
    </div>
  );
};

export default Home;
