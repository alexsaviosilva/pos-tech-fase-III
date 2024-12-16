import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header"; 

export default function EditarPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [imagem, setImagem] = useState(null);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("Usuário"); 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token) {
          alert("Você precisa estar logado.");
          navigate("/");
          return;
        }

        if (user && user.name) setUserName(user.name); 

        const response = await api.get(`/posts/publicacoes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const post = response.data;
        setTitulo(post.titulo || "");
        setDescricao(post.descricao || "");
        setDisciplina(post.categoria || "");
      } catch (error) {
        console.error("Erro ao carregar publicação:", error);
        setMessage("Erro ao carregar a publicação para edição.");
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      titulo,
      descricao,
      categoria: disciplina,
      data: new Date().toISOString(),
      imagem: imagem ? imagem.name : "imagem-placeholder.png",
    };

    try {
      const token = localStorage.getItem("authToken");

      await api.put(`/posts/publicacoes/${id}`, updatedPost, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Publicação atualizada com sucesso!");
      setTimeout(() => navigate("/professor"), 1500);
    } catch (error) {
      console.error("Erro ao atualizar publicação:", error);
      setMessage("Erro ao atualizar publicação. Tente novamente.");
    }
  };

  const handleVoltar = () => navigate("/professor");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header name={userName} onLogout={handleLogout} />

      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Editar Publicação</h2>

        {message && (
          <p
            className={`text-center mb-4 font-semibold ${
              message.includes("sucesso") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="titulo" className="block text-gray-700 font-medium mb-2">
              Título
            </label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Digite o título"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="descricao" className="block text-gray-700 font-medium mb-2">
              Descrição
            </label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite a descrição"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="disciplina" className="block text-gray-700 font-medium mb-2">
              Disciplina
            </label>
            <select
              id="disciplina"
              value={disciplina}
              onChange={(e) => setDisciplina(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            >
              <option value="" disabled>
                Selecione uma disciplina
              </option>
              <option value="Matemática">Matemática</option>
              <option value="História">História</option>
              <option value="Ciências">Ciências</option>
              <option value="Português">Português</option>
              <option value="Geografia">Geografia</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="imagem" className="block text-gray-700 font-medium mb-2">
              Imagem
            </label>
            <input
              type="file"
              id="imagem"
              accept="image/*"
              onChange={(e) => setImagem(e.target.files[0])}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleVoltar}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
            >
              Voltar
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
