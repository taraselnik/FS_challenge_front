import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ListValues } from "./components/ListValues";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<ListValues />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;