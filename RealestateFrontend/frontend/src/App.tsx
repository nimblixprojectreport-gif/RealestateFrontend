import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ background: "black", padding: "10px" }}>
        <Link to="/" style={{ color: "white", marginRight: "10px" }}>
          Home
        </Link>
        <Link to="/favorites" style={{ color: "white" }}>
          Favorites
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;