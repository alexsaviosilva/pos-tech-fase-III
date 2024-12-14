import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Inicializa o mock para o Axios
const mock = new MockAdapter(axios);

// Dados mockados para as publicações
const publicacoesMock = [
  {
    id: "1",
    titulo: "A descoberta da matemática",
    descricao: "Um post sobre a história da matemática e sua evolução.",
    data: "15/11/2024",
    categoria: "matemática",
    imagem: "https://via.placeholder.com/300",
  },
  {
    id: "2",
    titulo: "Células eucariontes",
    descricao: "Como vivem e se reproduzem os organismos eucariontes.",
    data: "21/11/2024",
    categoria: "biologia",
    imagem: "https://via.placeholder.com/300",
  },
];

// Dados mockados para os autores
const autoresMock = [
  { _id: "1", nome: "Autor 1", materia: "Matemática" },
  { _id: "2", nome: "Autor 2", materia: "História" },
];

// Configuração do mock
export default function setupMocks() {
  // Mock para obter todas as publicações (GET /publicacoes)
  mock.onGet("/publicacoes").reply(200, publicacoesMock);

  // Mock para criar uma nova publicação (POST /publicacoes)
  mock.onPost("/publicacoes").reply((config) => {
    try {
      const novaPublicacao = JSON.parse(config.data); // Parse dos dados enviados
      novaPublicacao.id = (publicacoesMock.length + 1).toString(); // Gera um ID novo
      publicacoesMock.push(novaPublicacao); // Adiciona a publicação mockada
      return [201, novaPublicacao]; // Retorna o status 201 e os dados criados
    } catch (error) {
      console.error("Erro ao criar publicação no mock:", error);
      return [400, { message: "Erro ao criar publicação." }]; // Retorna erro 400
    }
  });

  // Mock para obter uma publicação específica (GET /publicacoes/:id)
  mock.onGet(/\/publicacoes\/\d+/).reply((config) => {
    const id = config.url.split("/").pop(); // Extrai o ID da URL
    const publicacao = publicacoesMock.find((pub) => pub.id === id); // Busca no array mockado
    if (publicacao) {
      return [200, publicacao]; // Retorna a publicação encontrada
    }
    return [404, { message: "Publicação não encontrada." }]; // Retorna erro 404
  });

  // Mock para obter todos os autores (GET /autores)
  mock.onGet("/autores").reply(200, autoresMock);

  // Mock para criar um novo autor (POST /autores)
  mock.onPost("/autores").reply((config) => {
    try {
      const novoAutor = JSON.parse(config.data); // Parse dos dados enviados
      novoAutor._id = (autoresMock.length + 1).toString(); // Gera um ID novo
      autoresMock.push(novoAutor); // Adiciona o autor mockado
      return [201, novoAutor]; // Retorna o status 201 e os dados criados
    } catch (error) {
      console.error("Erro ao criar autor no mock:", error);
      return [400, { message: "Erro ao criar autor." }]; // Retorna erro 400
    }
  });

  // Mock para erro genérico caso uma rota não exista
  mock.onAny().reply(404, { message: "Rota não encontrada no mock." });

  console.log("Mock configurado para as rotas /publicacoes e /autores.");
}
