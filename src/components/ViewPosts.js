import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import "./ViewPosts.css"; // Importa o arquivo CSS

function ViewPosts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) setUserName(user.name);

    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Usuário não autenticado. Faça login novamente.");
          return;
        }

        const response = await api.get(`/posts/publicacoes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(response.data);
      } catch (err) {
        console.error("Erro ao buscar publicação:", err);
        setError("Erro ao carregar a publicação. Verifique a conexão ou tente novamente.");
      }
    };

    fetchPost();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!post) {
    return <p className="loading-message">Carregando publicação...</p>;
  }

  return (
    <div className="view-posts-container">
      <Header name={userName} onLogout={handleLogout} />

      <div className="post-content">
        <h1 className="post-title">{post.titulo || "Título não disponível"}</h1>

        <img
          src={post.imagem || "https://via.placeholder.com/1200x600"}
          alt={post.titulo || "Imagem não disponível"}
          className="post-image"
        />

        <div className="post-details">
          <p className="post-date">
            Data: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Não disponível"}
          </p>
          <span className="post-category">
            {post.categoria || "Sem categoria"}
          </span>
        </div>

        <p className="post-description">
          {post.descricao || "Nenhuma descrição fornecida para esta publicação."}
        </p>

        {post.autor && (
          <div className="post-author">
            <p>
              Autor: <span className="author-name">{post.autor.nome || "Desconhecido"}</span>
            </p>
            <p>
              Matéria: <span className="author-materia">{post.autor.materia || "Não especificada"}</span>
            </p>
          </div>
        )}
      </div>

      <footer className="post-footer">
        <button className="back-button" onClick={() => navigate("/publicacoes")}>
          Voltar
        </button>
      </footer>
    </div>
  );
}

export default ViewPosts;
