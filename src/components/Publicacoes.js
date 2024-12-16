import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";

export default function Publicacoes() {
  const [publicacoes, setPublicacoes] = useState([]);
  const [filteredPublicacoes, setFilteredPublicacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterAutor, setFilterAutor] = useState("");
  const [filterMateria, setFilterMateria] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicacoes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/");
          return;
        }

        const response = await api.get("/publicacoes", {
          headers: { Authorization: `Bearer ${token}` },
        });

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
  }, [navigate]);

  const handleFilter = () => {
    let filtered = [...publicacoes];

    if (filterAutor) {
      filtered = filtered.filter((pub) =>
        pub.autor?.toLowerCase().includes(filterAutor.toLowerCase())
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
  }, [filterAutor, filterMateria]);

  if (loading) {
    return <p>Carregando publicações...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      <Header /> {/* Reutiliza o Header com o nome do usuário logado */}

      <div className="w-full max-w-4xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Feed de Publicações
        </h2>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Filtrar por autor"
            value={filterAutor}
            onChange={(e) => setFilterAutor(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 flex-1"
          />
          <input
            type="text"
            placeholder="Filtrar por matéria"
            value={filterMateria}
            onChange={(e) => setFilterMateria(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 flex-1"
          />
        </div>

        {/* Lista de Publicações */}
        {filteredPublicacoes.length > 0 ? (
          <div className="space-y-4">
            {filteredPublicacoes.map((pub) => (
              <div
                key={pub.id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold">{pub.titulo}</h3>
                <p className="text-sm text-gray-600">{pub.data}</p>
                <p className="text-sm text-gray-600 italic">
                  Autor: {pub.autor || "Desconhecido"}
                </p>
                <p className="text-gray-800">
                  {pub.descricao.length > 100
                    ? `${pub.descricao.substring(0, 100)}...`
                    : pub.descricao}
                </p>
                <button
                  className="mt-2 text-purple-600 hover:underline"
                  onClick={() => navigate(`/publicacoes/${pub.id}`)}
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
