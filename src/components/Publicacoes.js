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
  const [userName, setUserName] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) setUserName(user.name); 

    const fetchPublicacoes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/");
          return;
        }

        const response = await api.get("/posts/publicacoes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data)) {
          setPublicacoes(response.data);
          setFilteredPublicacoes(response.data);
        } else {
          console.error("Formato de resposta inválido:", response.data);
          setError("Formato inesperado de dados.");
        }
      } catch (error) {
        console.error("Erro ao buscar publicações:", error);
        setError("Não foi possível carregar as publicações.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicacoes();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleFilter = () => {
    let filtered = [...publicacoes];

    if (filterAutor) {
      filtered = filtered.filter((pub) =>
        pub.autor?.nome?.toLowerCase().includes(filterAutor.toLowerCase())
      );
    }

    if (filterMateria) {
      filtered = filtered.filter((pub) =>
        pub.autor?.materia?.toLowerCase().includes(filterMateria.toLowerCase())
      );
    }

    setFilteredPublicacoes(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [filterAutor, filterMateria]);

  if (loading) return <p>Carregando publicações...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header name={userName} onLogout={handleLogout} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center w-full">
          Feed de Publicações
        </h2>

        <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl mx-auto mb-6 space-y-4 md:space-y-0 md:space-x-4">
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

        <div className="flex flex-col items-center w-full max-w-4xl mx-auto space-y-4">
          {filteredPublicacoes.map((pub) => (
            <div
              key={pub._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition w-full"
            >
              <h3 className="text-lg font-bold">{pub.titulo || "Título desconhecido"}</h3>
              <p className="text-sm text-gray-600">{pub.data || "Data não disponível"}</p>
              <p className="text-sm text-gray-600 italic">
                Autor: {pub.autor?.nome || "Desconhecido"}
              </p>
              <p className="text-sm text-gray-600 italic">
                Matéria: {pub.autor?.materia || "Não informada"}
              </p>
              <p className="text-gray-800">
                {pub.descricao
                  ? pub.descricao.length > 100
                    ? `${pub.descricao.substring(0, 100)}...`
                    : pub.descricao
                  : "Descrição não disponível"}
              </p>
              <button
                className="mt-2  hover:underline"
                onClick={() => navigate(`/posts/publicacoes/${pub._id}`)}
              >
                Ler mais
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
