import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import NovoPost from "./components/NovoPost";
import Professor from "./components/Professor";
import EditarPost from "./components/EditarPost"; 
import Publicacoes from "./components/Publicacoes";
import ViewPosts from "./components/ViewPosts";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nova-publicacao" element={<NovoPost />} /> 
            <Route path="/professor" element={<Professor />} />
            <Route path="/publicacoes/editar/:id" element={<EditarPost />} /> 
            <Route path="/publicacoes" element={<Publicacoes />} />
            <Route path="/posts/publicacoes/:id" element={<ViewPosts />} />

            <Route path="*" element={<h1>Página não encontrada (404)</h1>} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white text-center p-4">
          <p>© 2024 MyBlog - Todos os direitos reservados</p>
        </footer>
      </div>
    </Router>
  );
}
