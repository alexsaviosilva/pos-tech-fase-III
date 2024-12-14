import React, { useState } from "react";
import api from "../services/api";

const CadastrarAutor = () => {
  const [nome, setNome] = useState("");
  const [materia, setMateria] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/autores", { nome, materia });
      setMessage("Autor cadastrado com sucesso!");
      setNome("");
      setMateria("");
    } catch (error) {
      console.error("Erro ao cadastrar autor:", error);
      setMessage("Erro ao cadastrar autor.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Cabeçalho */}
      <header className="w-full bg-black text-white p-4 flex flex-wrap justify-between items-center">
        <h1 className="text-xl font-bold">Cadastrar Autor</h1>
      </header>

      {/* Formulário */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 mt-6 mx-4 md:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Novo Autor
        </h2>

        {/* Mensagem de feedback */}
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
          {/* Campo Nome */}
          <div className="mb-4">
            <label
              htmlFor="nome"
              className="block text-gray-700 font-medium mb-2"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome do autor"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          {/* Campo Matéria */}
          <div className="mb-4">
            <label
              htmlFor="materia"
              className="block text-gray-700 font-medium mb-2"
            >
              Matéria
            </label>
            <input
              type="text"
              id="materia"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              placeholder="Digite a matéria do autor"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          {/* Botão Cadastrar */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
          >
            Cadastrar
          </button>
        </form>
      </div>

      {/* Rodapé */}
      <footer className="w-full text-center text-gray-500 py-4 mt-6">
        © 2024 MyBlog
      </footer>
    </div>
  );
};

export default CadastrarAutor;
