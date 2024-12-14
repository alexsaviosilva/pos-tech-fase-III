import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

const usuariosMock = [
  { id: "1", email: "professor@example.com", senha: "senha123", nome: "Professor 1", perfil: "professor" },
  { id: "2", email: "aluno@example.com", senha: "senha123", nome: "Aluno 1", perfil: "aluno" },
];

const publicacoesMock = [
  {
    id: "1",
    titulo: "A descoberta da matemática",
    descricao: "Um post sobre a história da matemática e sua evolução.",
    data: "15/11/2024",
    categoria: "matemática",
    imagem: "https://via.placeholder.com/300",
    autor: "Professor 1",
  },
  {
    id: "2",
    titulo: "Células eucariontes",
    descricao: "Como vivem e se reproduzem os organismos eucariontes.",
    data: "21/11/2024",
    categoria: "biologia",
    imagem: "https://via.placeholder.com/300",
    autor: "Professor 1",
  },
];

const autoresMock = [
  { _id: "1", nome: "Professor 1", materia: "Matemática" },
  { _id: "2", nome: "Aluno 1", materia: "História" },
];

export default function setupMocks() {
  mock.onPost("/").reply((config) => {
    const { email, senha } = JSON.parse(config.data);
    const usuario = usuariosMock.find((u) => u.email === email && u.senha === senha);

    if (usuario) {
      return [200, { id: usuario.id, nome: usuario.nome, perfil: usuario.perfil }];
    }

    return [401, { message: "Credenciais inválidas." }];
  });

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

  mock.onPut(/\/publicacoes\/\d+/).reply((config) => {
    const id = config.url.split("/").pop();
    const index = publicacoesMock.findIndex((pub) => pub.id === id);
    if (index !== -1) {
      const atualizacao = JSON.parse(config.data);
      publicacoesMock[index] = { ...publicacoesMock[index], ...atualizacao };
      return [200, publicacoesMock[index]];
    }
    return [404, { message: "Publicação não encontrada." }];
  });

  mock.onDelete(/\/publicacoes\/\d+/).reply((config) => {
    const id = config.url.split("/").pop();
    const index = publicacoesMock.findIndex((pub) => pub.id === id);
    if (index !== -1) {
      publicacoesMock.splice(index, 1);
      return [200, { message: "Publicação deletada com sucesso." }];
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

  console.log("Mock configurado com sucesso.");
}
