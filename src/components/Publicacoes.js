import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Publicacoes() {
  const [publicacoes, setPublicacoes] = useState([]);
  const [filteredPublicacoes, setFilteredPublicacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterProfessor, setFilterProfessor] = useState("");
  const [filterMateria, setFilterMateria] = useState("");
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const fetchPublicacoes = async () => {
      try {
        const response = await api.get("/publicacoes");
        setPublicacoes(response.data);
        setFilteredPublicacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar publicações:", error);
        setError("Não foi possível carregar as publicações.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicacoes();
  }, []);

  const handleFilter = () => {
    let filtered = [...publicacoes];
    if (filterProfessor) {
      filtered = filtered.filter((pub) =>
        pub.professor?.toLowerCase().includes(filterProfessor.toLowerCase())
      );
    }
    if (filterMateria) {
      filtered = filtered.filter((pub) =>
        pub.categoria?.toLowerCase().includes(filterMateria.toLowerCase())
      );
    }
    setFilteredPublicacoes(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [filterProfessor, filterMateria]);

  if (loading) {
    return <p>Carregando publicações...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      <header className="w-full bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Feed de Publicações</h1>
      </header>

      <div className="w-full max-w-4xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Publicações
        </h2>

        {/* Filtros */}
        <div className="flex justify-between mb-6">
          <input
            type="text"
            placeholder="Filtrar por professor"
            value={filterProfessor}
            onChange={(e) => setFilterProfessor(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-1/2 mr-2"
          />
          <input
            type="text"
            placeholder="Filtrar por matéria"
            value={filterMateria}
            onChange={(e) => setFilterMateria(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-1/2"
          />
        </div>

        {/* Lista de publicações */}
        {filteredPublicacoes.length > 0 ? (
          <div className="space-y-4">
            {filteredPublicacoes.map((pub) => (
              <div
                key={pub.id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold">{pub.titulo}</h3>
                <p className="text-sm text-gray-600">{pub.data}</p>
                <p className="text-gray-800">
                  {pub.descricao.length > 100
                    ? `${pub.descricao.substring(0, 100)}...`
                    : pub.descricao}
                </p>
                <button
                  className="text-violet-600 font-semibold mt-2"
                  onClick={() => navigate(`/publicacoes/${pub.id}`)} // Redireciona para a página de detalhes
                >
                  Ler mais
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            Nenhuma publicação encontrada.
          </p>
        )}
      </div>
    </div>
  );
}
