import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import "./Professor.css";

export default function Professor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [publicacoes, setPublicacoes] = useState([]);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchPublicacoes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Você precisa estar logado como professor para acessar esta página.");
          navigate("/");
          return;
        }

        const response = await api.get("/publicacoes", {
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

  const handleNovaPublicacao = () => {
    navigate("/nova-publicacoes");
  };

  const handleEditar = (id) => {
    navigate(`/publicacoes/editar/${id}`);
  };

  const handleExcluir = async (id) => {
    const token = localStorage.getItem("authToken");

    if (window.confirm("Tem certeza que deseja excluir esta publicação?")) {
      try {
        await api.delete(`/publicacoes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPublicacoes(publicacoes.filter((pub) => pub.id !== id));
        alert("Publicação excluída com sucesso!");
      } catch (err) {
        console.error("Erro ao excluir publicação:", err);
        alert("Erro ao excluir a publicação. Tente novamente.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Você foi deslogado com sucesso.");
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = (e) => {
    if (!e.target.closest(".profile-menu")) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <div className="container-global-prof">
      <div className="header">
        <div className="logo-publica">
          <img src="/MB.jpg" alt="My Blog Logo" />
          <span>My Blog</span>
        </div>
        <div className="profile-menu" onClick={toggleMenu}>
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
                <th>Disciplina</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {publicacoes.map((pub) => (
                <tr key={pub.id}>
                  <td>{pub.titulo}</td>
                  <td>{pub.descricao}</td>
                  <td>{pub.data}</td>
                  <td>{pub.categoria}</td>
                  <td>
                    <div className="acoes">
                      <button
                        className="editar-btn"
                        onClick={() => handleEditar(pub.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="excluir-btn"
                        onClick={() => handleExcluir(pub.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
