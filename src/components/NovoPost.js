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

    const novapublicacoes = {
      titulo,
      descricao,
      categoria: disciplina,
      data: new Date().toLocaleDateString("pt-BR"),
      imagem: imagem ? imagem.name : "placeholder-image.png",
    };

    try {
      const response = await api.post("/publicacoes", novapublicacoes);

      console.log("Publicação criada:", response.data);
      setMessage("Publicação criada com sucesso!");

      setTitulo("");
      setDescricao("");
      setDisciplina("");
      setImagem(null);

      navigate("/professor");
    } catch (error) {
      console.error("Erro ao criar publicação:", error);
      setMessage("Erro ao criar publicação. Verifique se o servidor está configurado corretamente.");
    }
  };

  const handleVoltar = () => {
    navigate("/professor");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      <header className="w-full bg-purple-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Nova Postagem</h1>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="/profile.png"
            alt="Avatar"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
          <span className="font-medium">Professor</span>
        </div>
      </header>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 mt-6 mx-4 md:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
          Nova publicação
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

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleVoltar}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition"
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
