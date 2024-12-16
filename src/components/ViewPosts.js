import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";

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
    return <p className="text-red-500 text-center mt-6">{error}</p>;
  }

  if (!post) {
    return <p className="text-center mt-6">Carregando publicação...</p>;
  }

  return (
    <div className="bg-gray-50 flex flex-col h-screen">
      <Header name={userName} onLogout={handleLogout} />

      <div className="flex-1 overflow-y-auto px-4 py-8 w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">{post.titulo || "Título não disponível"}</h1>

        <img
          src={post.imagem || "https://via.placeholder.com/1200x600"}
          alt={post.titulo || "Imagem não disponível"}
          className="w-full h-auto max-h-[400px] object-cover rounded-lg mb-6"
        />

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <p className="text-gray-600 text-sm">
            Data: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Não disponível"}
          </p>
          <span className="px-4 py-1 text-sm font-semibold text-white bg-violet-600 rounded-full">
            {post.categoria || "Sem categoria"}
          </span>
        </div>

        <p className="text-gray-800 text-lg leading-relaxed mb-4">
          {post.descricao || "Nenhuma descrição fornecida para esta publicação."}
        </p>

        {post.autor && (
          <div className="text-gray-600 text-sm">
            <p>
              Autor: <span className="font-semibold">{post.autor.nome || "Desconhecido"}</span>
            </p>
            <p>
              Matéria:{" "}
              <span className="font-semibold">{post.autor.materia || "Não especificada"}</span>
            </p>
          </div>
        )}
      </div>

      <footer className="w-full py-4 bg-white flex justify-center shadow-inner">
        <button
          className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-md hover:bg-violet-700 transition"
          onClick={() => navigate("/publicacoes")}
        >
          Voltar
        </button>
      </footer>
    </div>
  );
}

export default ViewPosts;
