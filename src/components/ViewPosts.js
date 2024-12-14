import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Header from "./Header";

function ViewPosts() {
  const { id } = useParams(); // Obtém o ID da publicação a partir da URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/publicacoes/${id}`); // Busca a publicação pelo ID
        setPost(response.data);
      } catch (err) {
        console.error("Erro ao buscar publicação:", err);
        setError("Não foi possível carregar a publicação.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Carregando publicação...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!post) {
    return <p className="text-gray-600 text-center">Publicação não encontrada.</p>;
  }

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800">{post.titulo}</h2>

          <span className="inline-block mt-2 px-4 py-2 text-sm font-medium text-white bg-violet-600 border border-violet-600 rounded-3xl">
            {post.categoria}
          </span>
        </div>

        <div className="flex justify-center px-4 py-8">
          <div className="bg-white shadow-md rounded-lg p-6 w-1/3 mb-6 mr-6">
            <img
              src={post.imagem || "https://via.placeholder.com/300"} // Fallback para placeholder se não houver imagem
              alt={post.titulo}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 w-1/3">
            <p className="text-gray-700 font-medium">{post.descricao}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewPosts;
