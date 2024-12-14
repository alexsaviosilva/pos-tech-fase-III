import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function EditarPost() {
  const { id } = useParams(); // ID da publicação passada pela URL
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [imagem, setImagem] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/publicacoes/${id}`);
        const post = response.data;
        setTitulo(post.titulo);
        setDescricao(post.descricao);
        setDisciplina(post.categoria);
      } catch (error) {
        console.error("Erro ao carregar publicação:", error);
        setMessage("Erro ao carregar a publicação para edição.");
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      titulo,
      descricao,
      categoria: disciplina,
      data: new Date().toLocaleDateString("pt-BR"), // Mantém a data atualizada
      imagem: imagem ? imagem.name : "placeholder-image.png",
    };

    try {
      await api.put(`/publicacoes/${id}`, updatedPost); // Atualiza publicação no backend
      setMessage("Publicação atualizada com sucesso!");
      navigate("/professor", { state: { atualizou: true } }); // Redireciona para a tela do professor
    } catch (error) {
      console.error("Erro ao atualizar publicação:", error);
      setMessage("Erro ao atualizar publicação. Verifique se o servidor está configurado corretamente.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      <header className="w-full bg-black text-white p-4 flex flex-wrap justify-between items-center">
        <h1 className="text-xl font-bold">EDIT POST</h1>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <span className="font-medium">Professor</span>
          <img
            src="/profile.png"
            alt="Avatar"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
        </div>
      </header>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 mt-6 mx-4 md:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
          Editar publicação
        </h2>
        {message && (
          <p
            className={`text-center font-semibold ${
              message.includes("sucesso") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="titulo" className="block text-gray-700 font-medium mb-2">
              Título
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
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
              name="descricao"
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
              name="disciplina"
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
              name="imagem"
              accept="image/*"
              onChange={(e) => setImagem(e.target.files[0])}
              className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-auto"
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
