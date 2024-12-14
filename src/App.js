import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import NovoPost from "./components/NovoPost";
import Professor from "./components/Professor";
import Publicacoes from "./components/Publicacoes";
import ListarAutores from "./components/ListarAutores";
import CadastrarAutor from "./components/CadastrarAutor";
import DetalhesAutor from "./components/DetalhesAutor";

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
              <Link to="/nova-publicacoes">Nova Publicação</Link>
            </li>
            <li className="hover:underline">
              <Link to="/professor">Professor</Link>
            </li>
            <li className="hover:underline">
              <Link to="/publicacoes">Publicacoes</Link>
            </li>
            <li className="hover:underline">
              <Link to="/autores">Listar Autores</Link>
            </li>
            <li className="hover:underline">
              <Link to="/cadastrar-autor">Cadastrar Autor</Link>
            </li>
          </ul>
        </nav>

        {/* Conteúdo Principal */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nova-publicacoes" element={<NovoPost />} />
            <Route path="/professor" element={<Professor />} />
            <Route path="/publicacoes" element={<Publicacoes />} />
            <Route path="/autores" element={<ListarAutores />} />
            <Route path="/cadastrar-autor" element={<CadastrarAutor />} />
            <Route path="/autores/:id" element={<DetalhesAutor />} />
            
            {/* Rota para página 404 */}
            <Route path="*" element={<h1>Página não encontrada (404)</h1>} />
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
