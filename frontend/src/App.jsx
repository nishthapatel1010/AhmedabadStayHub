import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/Mainlayout"; // Import MainLayout
import HomePage from "./pages/HomePage";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* MainLayout wraps the routes */}
        <Route  element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pgs-hostels" element={<h1>PGs & Hostels</h1>} />
          <Route path="/apartments" element={<h1>Apartments</h1>} />
          <Route path="/houses" element={<h1>Houses</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
