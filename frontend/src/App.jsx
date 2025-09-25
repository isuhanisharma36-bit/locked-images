import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Upload from "./Upload"
import LinkView from "./LinkView"
import Success from "./Success"
import Failure from "./Failure"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/l/:id" element={<LinkView />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
      </Routes>
    </Router>
  )
}
