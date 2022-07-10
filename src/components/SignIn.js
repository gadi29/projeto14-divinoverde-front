import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../context/UserContext.js";
import { ThreeDots } from "react-loader-spinner";

function SignIn() {
  const [newRegisterEmail, setNewRegisterEmail] = useState("");
  const [userSignIn, setUserSignIn] = useState({ email: "", password: "" });
  const [load, setLoad] = React.useState(false);

  const { setUser, userCreate, setUserCreate } = React.useContext(UserContext);

  const navigate = useNavigate();

  function sendToSignUp(e) {
    e.preventDefault();
    setLoad(true);
    const promisse = axios.get("http://localhost:5000/sign-in", { email: newRegisterEmail });

    promisse.then((r) => {
      setUserCreate({ ...userCreate, email: newRegisterEmail });
      setLoad(false);
      navigate("/sign-up");
    });
    promisse.catch((r) => {
      setLoad(false);
      alert(`Erro ${r.response.status}`);
    });
  }

  function login(e) {
    e.preventDefault();
    setLoad(true);
    const promisse = axios.post("http://localhost:5000/sign-in", {
      ...userSignIn,
    });

    promisse.then((r) => {
      setUser(r.data);
      setLoad(false);
      navigate("/");
    });
    promisse.catch((r) => {
      setLoad(false);
      if (r.response.status === 401) {
        alert("Email ou senha não conferem.");
      } else {
        alert(`Erro ${r.response.status}! Tente novamente...`);
      }
    });
  }

  return (
    <Container>
      <h2>Faça seu cadastro:</h2>
      <form onSubmit={sendToSignUp}>
        <input
          type="email"
          placeholder="E-mail"
          value={newRegisterEmail}
          disabled={load}
          onChange={(e) => setNewRegisterEmail(e.target.value)}
          required
        />
        <button type="submit">
          {load ? <ThreeDots color="#FFFFFF" /> : "Prosseguir com o cadastro"}
        </button>
      </form>
      <h2>Faça seu login:</h2>
      <form onSubmit={login}>
        <input
          type="email"
          placeholder="E-mail"
          value={userSignIn.email}
          disabled={load}
          onChange={(e) =>
            setUserSignIn({ ...userSignIn, email: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={userSignIn.password}
          disabled={load}
          onChange={(e) =>
            setUserSignIn({ ...userSignIn, password: e.target.value })
          }
          required
        />
        <button type="submit" disabled={load}>
          {load ? <ThreeDots color="#fff" /> : "Entrar"}
        </button>
      </form>
    </Container>
  );
}

export default SignIn;

const Container = styled.div`
  width: 100%;
  height: 90vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: #c26179;
    font-size: 32px;
    font-weight: 700;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      background-color: #72ab97;
      outline: none;
      border: none;
      border-radius: 5px;

      width: 304px;
      height: 48px;
      margin-top: 20px;
      padding: 0 8px;

      color: #ffffff;
      font-size: 24px;

      &::placeholder {
        color: #ffffff;
        font-weight: 600;
      }
    }

    button {
      background-color: #e99baf;
      border: none;
      border-radius: 5px;

      width: 250px;
      height: 50px;
      margin-top: 19px;
      margin-bottom: 70px;

      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        cursor: pointer;
        filter: brightness(130%);
      }
    }
  }
`;
