import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-6 bg-black bg-opacity-40 shadow-lg">
          <h1 className="text-2xl font-bold tracking-wide">🔒 Locked Images</h1>
          <div className="space-x-6">
            <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
            <Link to="/about" className="hover:text-yellow-300 transition">About</Link>
            <Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
