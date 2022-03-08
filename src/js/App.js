import React from "react";
import Navbar from "./components/Navbar";
import HomeView from "./views/Home";
import Settings from "./views/Settings";
import RegisterView from "./views/Register";
import LoginView from "./views/Login";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content-wrapper">
        <Routes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/" element={<HomeView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
