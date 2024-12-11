import React from "react";

export default function NovaPublicacao() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Cabeçalho */}
      <header className="w-full bg-black text-white p-4 flex flex-wrap justify-between items-center">
        <h1 className="text-xl font-bold">NEW POST</h1>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <span className="font-medium">Eduardo Souza</span>
          <img
            src="/profile.png"
            alt="Avatar"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
        </div>
      </header>

      {/* Formulário */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 mt-6 mx-4 md:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
          Nova publicação
        </h2>
        <form>
          {/* Campo Título */}
          <div className="mb-4">
            <label
              htmlFor="titulo"
              className="block text-gray-700 font-medium mb-2"
            >
              Título
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              placeholder="Digite o título"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          {/* Campo Descrição */}
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
              placeholder="Digite a descrição"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              rows="4"
              required
            />
          </div>

          {/* Campo Disciplina */}
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
              className="w-full border border-gray-300 rounded-md px-4 py-2"
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

          {/* Campo Imagem */}
          <div className="mb-6">
            <label
              htmlFor="imagem"
              className="block text-gray-700 font-medium mb-2"
            >
              Imagem
            </label>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <input
                type="file"
                id="imagem"
                name="imagem"
                accept="image/*"
                className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-auto"
              />
              <div className="w-32 h-32 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center">
                <img
                  src="/placeholder-image.png"
                  alt="Preview"
                  className="max-w-full max-h-full"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Selecione uma imagem do seu dispositivo
            </p>
          </div>

          {/* Botão Salvar */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
          >
            Salvar
          </button>
        </form>
      </div>

      {/* Rodapé */}
      <footer className="w-full text-center text-gray-500 py-4 mt-6">
        MyBlog © 2024
      </footer>
    </div>
  );
}
