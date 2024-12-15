import React, { useEffect, useState } from 'react';
import api from './api';

const ListarPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts'); 
        setPosts(response.data);
      } catch (error) {
        setError('Erro ao carregar os posts');
      } finally {
        setLoading(false); 
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h1>Lista de Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.titulo}</h2>
            <p>{post.conteudo}</p>
            <p>Autor: {post.autor.nome}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarPosts;
