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
            <img src=""></img>
            <span>Aluno</span>
            <img src=""></img>
          </div>
        </div>
        <div className="container-prof">
          <p>Isso é um teste!</p>
        </div>
      </div>
    </>
  );
}
