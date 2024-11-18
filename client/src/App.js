import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screen/home";
import Login from "./screen/login";

function App() {
  return (
    <div className="App w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/login" exact Component={Login} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
