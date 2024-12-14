import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const DetalhesAutor = () => {
  const { id } = useParams(); 
  const [autor, setAutor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAutor = async () => {
      try {
        const response = await api.get(`/autores/${id}`);
        setAutor(response.data);
      } catch (err) {
        console.error("Erro ao buscar autor:", err);
        setError("Erro ao carregar o autor.");
      }
    };

    fetchAutor();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!autor) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Detalhes do Autor</h1>
      <p>Nome: {autor.nome}</p>
      <p>Matéria: {autor.materia}</p>
    </div>
  );
};

export default DetalhesAutor;
