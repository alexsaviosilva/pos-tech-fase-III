import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function EditarPost() {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();

  // Estados para o formulário
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [imagem, setImagem] = useState(null);
  const [message, setMessage] = useState("");

  // Carregar os dados existentes do post ao montar o componente
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          alert("Você precisa estar logado.");
          navigate("/"); // Redireciona para o login
          return;
        }

        const response = await api.get(`/posts/publicacoes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const post = response.data;

        // Preenche os estados com os dados do post
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

  // Enviar as alterações
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      titulo,
      descricao,
      categoria: disciplina,
      data: new Date().toISOString(), // Atualiza a data de modificação
      imagem: imagem ? imagem.name : "imagem-placeholder.png",
    };

    try {
      const token = localStorage.getItem("authToken");

      await api.put(`/posts/publicacoes/${id}`, updatedPost, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Publicação atualizada com sucesso!");
      setTimeout(() => navigate("/professor"), 1500); // Redireciona após sucesso
    } catch (error) {
      console.error("Erro ao atualizar publicação:", error);
      setMessage("Erro ao atualizar publicação. Tente novamente.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">EDITAR PUBLICAÇÃO</h1>
        <div className="flex items-center gap-4">
          <span className="font-medium">Professor</span>
          <img
            src="/profile.png"
            alt="Avatar"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
        </div>
      </header>

      {/* Formulário */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Editar Publicação
        </h2>

        {/* Exibe mensagem de sucesso/erro */}
        {message && (
          <p
            className={`text-center mb-4 font-semibold ${
              message.includes("sucesso") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}
