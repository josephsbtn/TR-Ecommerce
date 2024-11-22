import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screen/home";
import Login from "./screen/login";
import Register from "./screen/register";
import AddItem from "./screen/admin/addItem";
import Dashboard from "./screen/admin/dashboard";
function App() {
  return (
    <div className="App w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/login" exact Component={Login} />
          <Route path="/register" exact Component={Register} />
          <Route path="/dashboard" exact Component={Dashboard} />
          <Route path="/addItem" exact Component={AddItem} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
