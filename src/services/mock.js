import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

// Dados mockados para as publicações
const publicacoesMock = [
  {
    id: "1",
    titulo: "A descoberta da matemática",
    descricao: "Um post sobre a história da matemática e sua evolução.",
    data: "15/11/2024",
    categoria: "matemática",
    imagem: "math.jpg",
  },
  {
    id: "2",
    titulo: "Células eucariontes",
    descricao: "Como vivem e se reproduzem os organismos eucariontes.",
    data: "21/11/2024",
    categoria: "biologia",
    imagem: "biology.jpg",
  },
];

export default function setupMocks() {
  // Mock para obter publicações
  mock.onGet("/publicacoes").reply(200, publicacoesMock);

  // Mock para criar uma nova publicação
  mock.onPost("/publicacoes").reply((config) => {
    const novaPublicacao = JSON.parse(config.data); // Parse dos dados enviados
    novaPublicacao.id = (publicacoesMock.length + 1).toString(); // Gera um ID novo
    publicacoesMock.push(novaPublicacao); // Adiciona a publicação mockada
    return [201, novaPublicacao]; // Retorna o status 201 e os dados criados
  });

  console.log("Mock configurado para as rotas /publicacoes.");

  const autoresMock = [
    { _id: "1", nome: "Autor 1", materia: "Matemática" },
    { _id: "2", nome: "Autor 2", materia: "História" },
  ];
  
  mock.onGet("/autores").reply(200, autoresMock);
  mock.onPost("/autores").reply((config) => {
    const novoAutor = JSON.parse(config.data);
    novoAutor._id = (autoresMock.length + 1).toString();
    autoresMock.push(novoAutor);
    return [201, novoAutor];
  });

  
  
}
