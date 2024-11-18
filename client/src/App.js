import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screen/home";

function App() {
  return (
    <div className="App w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
