import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./Upload";
import LinkView from "./LinkView";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <header className="p-4 text-center text-2xl font-bold bg-indigo-800 shadow">
          🔒 Locked Images
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/l/:id" element={<LinkView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
