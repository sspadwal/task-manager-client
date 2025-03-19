import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('User');
  const navigate = useNavigate();

  const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      setIsAuthenticated(true);
      setUsername(user.username || 'User');
    } else {
      setIsAuthenticated(false);
      setUsername('User');
    }
  };

  useEffect(() => {
    checkAuth(); // Check on mount
  }, []);

  // Update auth status on navigation
  useEffect(() => {
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUsername('User');
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/"><img className="logo" src="/logo2.png" alt="Logo" /></Link>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span className={isOpen ? 'open' : ''}></span>
      </button>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        {isAuthenticated ? (
          <>
            <li><Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
            <li><span className="username">Welcome, {username}</span></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
            <li><Link to="/register" onClick={() => setIsOpen(false)}>Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;