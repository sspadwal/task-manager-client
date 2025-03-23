// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// import '../App.css';

const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Taskify: Rule Your Tasks</h1>
                    <p className="hero-subtitle">
                        Streamline your workload with a dark, dynamic task manager built for action.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/login" className="btn primary-btn">
                            Get Organized
                        </Link>
                        <Link to="/register" className="btn secondary-btn">
                            Create Account
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section (Below Hero) */}
            <section className="features-section">
                <h2 className="features-title">Master Every Moment</h2>
                <p className="features-subtitle">Your ultimate toolkit for task domination.</p>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📋</div>
                        <h3>Task Clarity</h3>
                        <p>Turn messy lists into a clear, actionable plan.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Swift Sorting</h3>
                        <p>Rank tasks instantly to tackle the big stuff first.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Success Snapshot</h3>
                        <p>Get a bold view of what you’ve crushed.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🌐</div>
                        <h3>Task Anywhere</h3>
                        <p>Manage on the go, from any device.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section (Below Features) */}
            <section className="cta-section">
                <h2 className="cta-title">Lead Your Day</h2>
                <p className="cta-text">Become one of the elite who own their time.</p>
                <Link to="/register" className="btn cta-btn">
                    Begin Mastery
                </Link>
            </section>
        </div>
    );
};

export default Home;