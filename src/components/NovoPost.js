import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import "./NovoPost.css";

export default function NovoPost() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [imagem, setImagem] = useState(null);
  const [autor, setAutor] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      setUserName(user.name || "Usuário");
      setAutor(user.id);
    } else {
      setMessage("Usuário não autenticado. Faça login novamente.");
      setMessageType("error");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaPublicacao = {
      titulo,
      descricao,
      categoria: disciplina,
      autor,
      data: new Date().toISOString(),
      imagem: imagem ? imagem.name : "placeholder.png",
    };

    try {
      const token = localStorage.getItem("authToken");

      await api.post("/posts/publicacoes", novaPublicacao, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Publicação criada com sucesso!");
      setMessageType("success");
      setTimeout(() => navigate("/professor"), 1500);
    } catch (error) {
      console.error("Erro ao criar publicação:", error);
      setMessage("Erro ao criar publicação. Verifique os dados e tente novamente.");
      setMessageType("error");
    }
  };

  const handleVoltar = () => navigate("/professor");

  return (
    <div className="container-novo-post">
      <Header name={userName} onLogout={() => navigate("/")} />

      <div className="form-novo-post-container">
        <form onSubmit={handleSubmit} className="form-novo-post">
          <h2 className="text-2xl font-semibold text-center mb-6">Nova Publicação</h2>

          {message && (
            <div className={`alert ${messageType === "success" ? "alert-success" : "alert-error"}`}>
              {message}
            </div>
          )}

          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows="4"
            required
          ></textarea>

          <label htmlFor="disciplina">Disciplina</label>
          <select
            id="disciplina"
            value={disciplina}
            onChange={(e) => setDisciplina(e.target.value)}
            required
          >
            <option value="" disabled>Selecione uma disciplina</option>
            <option value="Matemática">Matemática</option>
            <option value="História">História</option>
            <option value="Ciências">Ciências</option>
            <option value="Português">Português</option>
            <option value="Geografia">Geografia</option>
          </select>

          <label htmlFor="imagem">Imagem</label>
          <input
            type="file"
            id="imagem"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files[0])}
          />

          <div className="buttons-container">
            <button type="button" onClick={handleVoltar} className="btn-voltar">
              Voltar
            </button>
            <button type="submit" className="btn-publicar">
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
