import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Weather from './Weather';
import MainComponent from './MainComponent';
import Chatbot from './chatbot'; // Import the Chatbot component



function App() {
  return (
    <Router>
      <div>
        {/* Header with navigation links */}
        <Navbar />

        {/* Main content area */}
        <div className="main-content">
          <Routes>
            {/* MainComponent visible on homepage ("/") */}
            <Route path="/" element={<MainComponent />} />

            {/* Weather page route */}
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </div>

        {/* Chatbot Component - Floating Chatbot */}
        <Chatbot/>
      </div>
    </Router>
  );
}

export default App;
