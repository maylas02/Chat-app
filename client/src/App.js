import "./App.css";
import io from "socket.io-client";
import { Login } from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";

const socket = io.connect("http://localhost:3001");
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login socket={socket} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
