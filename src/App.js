import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Cloud from "./components/Cloud";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Cloud />} />
      <Route path="/home" element={<Cloud />} />
      <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
