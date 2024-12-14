import React, { useEffect, useState } from "react";
import api from "../services/api";

const ListarAutores = () => {
  const [autores, setAutores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const response = await api.get("/autores");
        setAutores(response.data);
      } catch (err) {
        console.error("Erro ao buscar autores:", err);
        setError("Não foi possível carregar a lista de autores.");
      }
    };

    fetchAutores();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Cabeçalho */}
      <header className="w-full bg-black text-white p-4 flex flex-wrap justify-between items-center">
        <h1 className="text-xl font-bold">Lista de Autores</h1>
      </header>

      {/* Conteúdo */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 mt-6 mx-4 md:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Autores Cadastrados
        </h2>

        {/* Mensagem de Erro */}
        {error && (
          <p className="text-red-500 text-center font-semibold mb-4">{error}</p>
        )}

        {/* Tabela de Autores */}
        {autores.length > 0 ? (
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2 text-left">Nome</th>
                <th className="border px-4 py-2 text-left">Matéria</th>
              </tr>
            </thead>
            <tbody>
              {autores.map((autor) => (
                <tr key={autor._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{autor.nome}</td>
                  <td className="border px-4 py-2">{autor.materia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">Nenhum autor encontrado.</p>
        )}
      </div>

      {/* Rodapé */}
      <footer className="w-full text-center text-gray-500 py-4 mt-6">
        © 2024 MyBlog
      </footer>
    </div>
  );
};

export default ListarAutores;
