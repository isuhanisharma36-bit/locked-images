import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./Upload";
import LinkView from "./LinkView";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <Navbar />

        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/l/:id" element={<LinkView />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
