import React, { useState } from "react";
import Header from "./Header";
import NovoPost from "./NovoPost";

function MenuForm() {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    disciplina: "",
    imagem: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imagem" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      < Header />
      < NovoPost title="Nova publicação" />
      <div className="flex justify-center items-center h-screen bg-gray-100 mt-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-[90dvw]"
        >

          <div className="mb-4">
            <label htmlFor="titulo" className="block text-gray-700 font-medium mb-2">
              Título
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Digite o título"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="descricao"
              className="block text-gray-700 font-medium mb-2"
            >
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Digite a descrição"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="disciplina"
              className="block text-gray-700 font-medium mb-2"
            >
              Disciplina
            </label>
            <select
              id="disciplina"
              name="disciplina"
              value={formData.disciplina}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                Selecione uma disciplina
              </option>
              <option value="Matemática">Matemática</option>
              <option value="História">História</option>
              <option value="Ciências">Ciências</option>
              <option value="Português">Português</option>
              <option value="Geografia">Geografia</option>
            </select>
          </div>

          <div className="mb-4 flex items-center">

            <div className="w-full">
              <label
                htmlFor="imagem"
                className="block text-gray-700 font-medium mb-2"
              >
                Imagem
              </label>

              <input
                type="file"
                id="imagem"
                name="imagem"
                onChange={handleChange}
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />

            </div>

          </div>

          <button
            type="submit"
            className="w-1/12 bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700"
          >
            Salvar
          </button>
        </form>
      </div>
    </>
  );
}

export default MenuForm;
