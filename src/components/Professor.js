import React from "react";
import "./Professor.css";

export default function Professor() {
  return (
    <>
      <div className="container-global-prof">
        <div className="header">
          <div className="logo-publica">
            <img src="/MB.jpg"></img>
            <span>My Blog</span>
          </div>
          <div className="logout">
            <img src="/user.svg"></img>
            <span>Professor</span>
            <img src="/logout.svg"></img>
          </div>
        </div>
        <div className="container-prof">
          <div className="principal-content">
            <h1>Publicações</h1>
            <button>Nova Publicação</button>
          </div>
          <table className="tabela">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Data de criação</th>
            <th>Disciplina</th>
          </tr>
        </thead>
        <tbody>
         {/* vai ser trocado pela função de adicionar uma nova Publicação */}
         <tr>
                <td>A descoberta da matemática</td>
                <td>Um post sobre a história da matemática e sua evolução até os dias de hoje</td>
                <td>15/11/2024</td>
                <td>matemática</td>
            </tr>
            <tr>
                <td>Células eucariontes</td>
                <td>Como o tipo desses organismos vivem e quais são suas características e formas de reprodução.</td>
                <td>21/11/2024</td>
                <td>biologia</td>
            </tr>
        </tbody>
      </table>
        </div>
      </div>
    </>
  );
}
