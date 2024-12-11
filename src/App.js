import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import NovaPublicacao from "./components/NovoPost";
import Professor from "./components/Professor";
import Aluno from "./components/Aluno";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navegação */}
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex justify-around">
            <li className="hover:underline">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:underline">
              <Link to="/nova-publicacao">Nova Publicação</Link>
            </li>
            <li className="hover:underline">
              <Link to="/professor">Professor</Link>
            </li>
            <li className="hover:underline">
              <Link to="/aluno">Aluno</Link>
            </li>
          </ul>
        </nav>

        {/* Conteúdo das Rotas */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nova-publicacao" element={<NovaPublicacao />} />
            <Route path="/professor" element={<Professor />} />
            <Route path="/aluno" element={<Aluno />} />
          </Routes>
        </main>

        {/* Rodapé */}
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>© 2024 MyBlog - Todos os direitos reservados</p>
        </footer>
      </div>
    </Router>
  );
}
