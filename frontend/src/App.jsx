import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Upload from "./Upload";
import LinkView from "./LinkView";
import About from "./About";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/l/:id" element={<LinkView />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
