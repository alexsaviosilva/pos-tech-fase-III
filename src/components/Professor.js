import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Professor.css";

export default function Professor() {
  const navigate = useNavigate();
  const [publicacoes, setPublicacoes] = useState([]);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para formatar datas
  const formatarData = (data) => {
    if (!data) return "Data desconhecida";
    return new Date(data).toLocaleDateString("pt-BR");
  };

  // Busca as publicações na API
  useEffect(() => {
    const fetchPublicacoes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log("Token JWT recuperado:", token);

        if (!token) {
          alert("Você precisa estar logado como professor para acessar esta página.");
          navigate("/");
          return;
        }

        const response = await api.get("/posts/publicacoes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPublicacoes(response.data);
      } catch (err) {
        console.error("Erro ao buscar publicações:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          alert("Sessão expirada. Faça login novamente.");
          handleLogout();
        } else {
          setError("Erro ao carregar as publicações.");
        }
      }
    };

    fetchPublicacoes();
  }, [navigate]);

  // Redireciona para criação de nova publicação
  const handleNovaPublicacao = () => {
    navigate("/nova-publicacao");
  };

  // Redireciona para edição de publicação
  const handleEditar = (id) => {
    navigate(`/publicacoes/editar/${id}`);
  };

  const handleExcluir = async (id) => {
    const token = localStorage.getItem("authToken");
  
    if (window.confirm("Tem certeza que deseja excluir esta publicação?")) {
      try {
        const response = await api.delete(`/posts/publicacoes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.status === 200) {
          setPublicacoes((prev) => prev.filter((pub) => pub._id !== id));
          alert("Publicação excluída com sucesso!");
        }
      } catch (err) {
        console.error("Erro ao excluir publicação:", err.response?.data || err.message);
        alert("Erro ao excluir a publicação. Verifique se ela ainda existe.");
      }
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Você foi deslogado com sucesso.");
    navigate("/");
  };

  return (
    <div className="container-global-prof">
      <div className="header">
        <div className="logo-publica">
          <img src="/MB.jpg" alt="My Blog Logo" />
          <span>My Blog</span>
        </div>
        <div className="profile-menu" onClick={() => setMenuOpen((prev) => !prev)}>
          <img src="/user.svg" alt="User Icon" />
          <span>Professor</span>
          {menuOpen && (
            <div className="menu-dropdown">
              <p onClick={handleLogout}>Sair</p>
            </div>
          )}
        </div>
      </div>
      <div className="container-prof">
        <div className="principal-content">
          <h1>Publicações</h1>
          <button onClick={handleNovaPublicacao} className="nova-publicacao-btn">
            Nova Publicação
          </button>
        </div>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <table className="tabela">
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
                    <td>{pub.autor ? pub.autor.nome : "Autor desconhecido"}</td>
                    <td>
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
                  <td colSpan="5" style={{ textAlign: "center" }}>
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
