import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function NovoPost() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [imagem, setImagem] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Estrutura do payload
    const novaPublicacao = {
      titulo,
      descricao,
      categoria: disciplina,
      data: new Date().toISOString(), // Data no formato ISO
      imagem: imagem ? imagem.name : "placeholder.png",
    };

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Você precisa estar logado.");
        navigate("/");
        return;
      }

      // Envia os dados para a API
      const response = await api.post("/posts/publicacoes", novaPublicacao, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Publicação criada:", response.data);
      setMessage("Publicação criada com sucesso!");

      // Redireciona após sucesso
      setTimeout(() => navigate("/professor"), 1500);
    } catch (error) {
      console.error("Erro ao criar publicação:", error);
      setMessage("Erro ao criar publicação. Verifique os dados e tente novamente.");
    }
  };

  const handleVoltar = () => {
    navigate("/professor");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      <header className="w-full bg-purple-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Nova Publicação</h1>
        <div className="flex items-center gap-2">
          <img src="/profile.png" alt="Avatar" className="w-8 h-8 rounded-full" />
          <span className="font-medium">Professor</span>
        </div>
      </header>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 mt-6 mx-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">Nova Publicação</h2>

        {message && (
          <p
            className={`text-center font-semibold mb-4 ${
              message.includes("sucesso") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="titulo" className="block font-medium mb-2">
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
            <label htmlFor="descricao" className="block font-medium mb-2">
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
            <label htmlFor="disciplina" className="block font-medium mb-2">
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
            <label htmlFor="imagem" className="block font-medium mb-2">
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
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
