import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Professor from "./components/Professor";
import Aluno from "./components/Aluno"

function App() {
  return (
    <Router>
      <div>
        {/* Navegação */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/professor">Professor</Link>
            </li>
            <li>
              <Link to="/aluno">Aluno</Link>
            </li>
          </ul>
        </nav>

        {/* Rotas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/professor" element={<Professor />} />
          <Route path="/aluno" element={<Aluno />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
