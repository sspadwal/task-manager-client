import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';

import './App.css';

export const ProtectedRoute = ({ children }) => {
	const user = JSON.parse(localStorage.getItem('user')); // Check full user object
	return user && user.token ? children : <Navigate to="/login" />;
};

function App() {
	return (
		<Router>
			<div className="app">
				<Navbar />
				<main className="main-content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>
						<Route path="/" element={<Navigate to="/login" />} />
						<Route path="*" element={<Navigate to="/login" />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
