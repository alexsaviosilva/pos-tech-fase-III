import React from "react";

export default function Aluno() {
  return (
    <>
      <div>
        <h1>Lista de Publicações</h1>
        <div>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>Categoria</th>
              </tr>
            </thead>
            <tbody>
              {/* Vai ser trocado pela função de adicionar uma nova Publicação */}
              <tr>
                <td>
                  <img src="math.jpg" alt="Imagem ilustrativa sobre matemática" />
                  A descoberta da matemática
                </td>
                <td>
                  Um post sobre a história da matemática e sua evolução até os dias de hoje
                </td>
                <td>15/11/2024</td>
                <td>matemática</td>
              </tr>
              <tr>
                <td>
                  <img src="biology.jpg" alt="Imagem ilustrativa sobre biologia" />
                  Células eucariontes
                </td>
                <td>
                  Como o tipo desses organismos vivem e quais são suas características e formas de reprodução.
                </td>
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
