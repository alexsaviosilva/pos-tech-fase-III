import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <>
    <div className="container-global">
      <div className="container">
        <img className="logo" src="/MB.jpg" alt="logo"></img>
        <span className="title-logo">MyBlog</span>
        <form>
          <div className="login-info">
            {/* <label for="username">Username*</label> */}
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username*"
              required
            ></input>
            {/* <label for="password">Password*</label> */}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password*"
              required
            ></input>
          </div>
          <div className="login-features">
            <div className="remember">
              <label for="rememberme">Remember me</label>
              <input
                type="checkbox"
                id="rememberme"
                name="rememberme"
                required
              ></input>
            </div>

            <a href="">Forgot Password?</a>
          </div>

          <div>
            <button>Login</button>
          </div>
        </form>
      </div>
      </div>  
    </>
  );
}
