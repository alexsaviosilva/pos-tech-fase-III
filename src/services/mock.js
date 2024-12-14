import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

const publicacoesMock = [
  {
    id: "1",
    titulo: "A descoberta da matemática",
    descricao: "Um post sobre a história da matemática e sua evolução.",
    data: "15/11/2024",
    categoria: "matemática",
    imagem: "https://via.placeholder.com/300",
    autor: "Autor 1",
  },
  {
    id: "2",
    titulo: "Células eucariontes",
    descricao: "Como vivem e se reproduzem os organismos eucariontes.",
    data: "21/11/2024",
    categoria: "biologia",
    imagem: "https://via.placeholder.com/300",
    autor: "Autor 2",
  },
];

const autoresMock = [
  { _id: "1", nome: "Autor 1", materia: "Matemática" },
  { _id: "2", nome: "Autor 2", materia: "História" },
];

export default function setupMocks() {
  mock.onGet("/publicacoes").reply(200, publicacoesMock);

  mock.onPost("/publicacoes").reply((config) => {
    try {
      const novaPublicacao = JSON.parse(config.data); 
      novaPublicacao.id = (publicacoesMock.length + 1).toString(); 
      publicacoesMock.push(novaPublicacao); 
      return [201, novaPublicacao]; 
    } catch (error) {
      console.error("Erro ao criar publicação no mock:", error);
      return [400, { message: "Erro ao criar publicação." }]; 
    }
  });

  mock.onGet(/\/publicacoes\/\d+/).reply((config) => {
    const id = config.url.split("/").pop(); 
    const publicacao = publicacoesMock.find((pub) => pub.id === id); 
    if (publicacao) {
      return [200, publicacao]; 
    }
    return [404, { message: "Publicação não encontrada." }]; 
  });

  mock.onGet("/autores").reply(200, autoresMock);

  mock.onPost("/autores").reply((config) => {
    try {
      const novoAutor = JSON.parse(config.data); 
      novoAutor._id = (autoresMock.length + 1).toString(); 
      autoresMock.push(novoAutor); 
      return [201, novoAutor]; 
    } catch (error) {
      console.error("Erro ao criar autor no mock:", error);
      return [400, { message: "Erro ao criar autor." }]; 
    }
  });

  mock.onAny().reply(404, { message: "Rota não encontrada no mock." });

  console.log("Mock configurado para as rotas /publicacoes e /autores.");
}
