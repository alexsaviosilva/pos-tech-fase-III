import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ViewPosts() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [post, setPost] = useState(null); 
  const [error, setError] = useState(null); 

  useEffect(() => {
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

  if (error) {
    return <p className="text-red-500 text-center mt-6">{error}</p>;
  }

  if (!post) {
    return <p className="text-center mt-6">Carregando publicação...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      <header className="w-full bg-black text-white p-6">
        <h1 className="text-xl md:text-2xl font-bold text-center">
          {post.titulo || "Título não disponível"}
        </h1>
      </header>

      <div className="flex flex-col items-center px-4 py-8 w-full max-w-5xl">
        <div className="bg-white shadow-md rounded-lg p-6 w-full mb-6">
          <img
            src={post.imagem || "https://via.placeholder.com/300"}
            alt={post.titulo || "Imagem não disponível"}
            className="w-full max-h-96 object-cover rounded-md mb-6"
          />

          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4">
            <p className="text-gray-600 text-sm">
              Data: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Não disponível"}
            </p>
            <span className="px-4 py-1 mt-2 sm:mt-0 text-sm font-semibold text-white bg-violet-600 rounded-full">
              {post.categoria || "Sem categoria"}
            </span>
          </div>

          <p className="text-gray-800 text-base md:text-lg leading-relaxed">
            {post.descricao || "Nenhuma descrição fornecida para esta publicação."}
          </p>

          {post.autor && (
            <div className="mt-4">
              <p className="text-gray-600 text-sm">
                Autor: <span className="font-semibold">{post.autor.nome || "Desconhecido"}</span>
              </p>
              <p className="text-gray-600 text-sm">
                Matéria: <span className="font-semibold">{post.autor.materia || "Não especificada"}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <footer className="flex justify-center items-center mt-6">
        <button
          className="px-6 py-2 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 transition"
          onClick={() => navigate("/publicacoes")}
        >
          Voltar
        </button>
      </footer>
    </div>
  );
}

export default ViewPosts;
