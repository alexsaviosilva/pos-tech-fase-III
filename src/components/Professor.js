import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header"; 
import "./Professor.css"; 

export default function Professor() {
  const navigate = useNavigate();
  const [publicacoes, setPublicacoes] = useState([]);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) setUserName(user.name);

    const fetchPublicacoes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Você precisa estar logado.");
          navigate("/");
          return;
        }

        const response = await api.get("/posts/publicacoes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPublicacoes(response.data);
      } catch (err) {
        console.error("Erro ao buscar publicações:", err);
        setError("Erro ao carregar as publicações.");
      }
    };

    fetchPublicacoes();
  }, [navigate]);

  const handleNovaPublicacao = () => navigate("/nova-publicacao");

  const handleEditar = (id) => navigate(`/publicacoes/editar/${id}`);

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta publicação?")) {
      try {
        const token = localStorage.getItem("authToken");
        await api.delete(`/posts/publicacoes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPublicacoes((prev) => prev.filter((pub) => pub._id !== id));
        alert("Publicação excluída com sucesso!");
      } catch (err) {
        console.error("Erro ao excluir publicação:", err);
        alert("Erro ao excluir publicação. Tente novamente.");
      }
    }
  };

  const formatarData = (data) =>
    data ? new Date(data).toLocaleDateString("pt-BR") : "Data desconhecida";

  return (
    <div className="professor-container">
      <Header name={userName} onLogout={() => navigate("/")} />

      <div className="publicacoes-container">
        <div className="principal-content">
          <h1>Publicações</h1>
          <button onClick={handleNovaPublicacao} className="nova-publicacao-btn">
            Nova Publicação
          </button>
        </div>

        {error ? (
          <p className="error">{error}</p>
        ) : (
          <table className="publicacoes-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Data de Criação</th>
                <th>Autor</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {publicacoes.length > 0 ? (
                publicacoes.map((pub) => (
                  <tr key={pub._id}>
                    <td>{pub.titulo}</td>
                    <td>{pub.descricao}</td>
                    <td>{formatarData(pub.createdAt)}</td>
                    <td>{pub.autor?.nome || "Autor desconhecido"}</td>
                    <td className="acoes">
                      <button className="editar-btn" onClick={() => handleEditar(pub._id)}>
                        Editar
                      </button>
                      <button className="excluir-btn" onClick={() => handleExcluir(pub._id)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Nenhuma publicação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
