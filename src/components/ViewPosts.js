import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ViewPosts() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [post, setPost] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/publicacoes/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error("Erro ao buscar publicação:", err);
        setError("Erro ao carregar a publicação.");
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!post) {
    return <p>Carregando publicação...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      <header className="w-full bg-black text-white p-6">
        <h1 className="text-xl md:text-2xl font-bold text-center">{post.titulo}</h1>
      </header>

      <div className="flex flex-col items-center px-4 py-8 w-full max-w-5xl overflow-auto">
        <div className="bg-white shadow-md rounded-lg p-6 w-full mb-6">
          <img
            src={post.imagem || "https://via.placeholder.com/300"}
            alt={post.titulo}
            className="w-full max-h-96 object-cover rounded-md mb-6"
          />
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4">
            <p className="text-gray-600 text-sm">{post.data}</p>
            <span className="px-4 py-1 mt-2 sm:mt-0 text-sm font-semibold text-white bg-violet-600 rounded-full">
              {post.categoria}
            </span>
          </div>
          <p className="text-gray-800 text-base md:text-lg leading-relaxed">{post.descricao}</p>
        </div>
      </div>

      <footer className="w-full bg-gray-800 py-4 fixed bottom-0 flex justify-center items-center">
        <button
          className="px-6 py-2 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 transition"
          onClick={() => navigate(-1)} 
        >
          Voltar
        </button>
      </footer>
    </div>
  );
}

export default ViewPosts;
