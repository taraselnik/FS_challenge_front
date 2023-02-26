import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListValues } from "./components/ListValues";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="container">
        <Routes>
          <Route path="/" element={<ListValues />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;