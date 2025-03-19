// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming CSS is in App.css

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to Taskify</h1>
                    <p>Organize your tasks, boost productivity, and achieve your goals with ease.</p>
                    <div className="hero-buttons">
                        <Link to="/login" className="btn primary-btn">Get Started</Link>
                        <Link to="/register" className="btn secondary-btn">Sign Up</Link>
                    </div>
                </div>
            </section>
            <section className="features">
                <h2>Why Choose Task Manager?</h2>
                <div className="feature-grid">
                    <div className="feature-item">
                        <h3>Easy Task Management</h3>
                        <p>Create, edit, and delete tasks effortlessly.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Priority Settings</h3>
                        <p>Set priorities to focus on what matters most.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Progress Tracking</h3>
                        <p>Monitor your task completion status.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;