import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from "../context/UserContext.js";

function SignIn () {
  const [newRegisterEmail, setNewRegisterEmail] = useState("");
  const [user, setUser] = useState({ email: "", password: "" });

  const { userCreate, setUserCreate } = React.useContext(UserContext);

  const navigate = useNavigate();

  function sendToSignUp(e) {
    e.preventDefault();
    setUserCreate({ ...userCreate, email: newRegisterEmail });
    navigate('/sign-up');
  }

  function login(e) {
    e.preventDefault();
    const promisse = axios.post('http://localhost:5000/sign-in', { ...user });
  }

  return (
    <Container>
    <h2>Faça seu cadastro:</h2>
    <form onSubmit={sendToSignUp}>
      <input 
        type='email'
        placeholder='E-mail'
        value={newRegisterEmail}
        onChange={(e) => setNewRegisterEmail(e.target.value)}
        required
      />
      <button type='submit'>Prosseguir com o cadastro</button>
    </form>
    <h2>Faça seu login:</h2>
    <form onSubmit={login}>
    <input 
        type='email'
        placeholder='E-mail'
        value={user.email}
        onChange={(e) => setUser({...user, email:e.target.value })}
        required
      />
      <input 
        type='password'
        placeholder='Senha'
        value={user.password}
        onChange={(e) => setUser({...user, password:e.target.value })}
        required
      />
      <button type='submit'>Entrar</button>
    </form>
    </Container>
  );
}

export default SignIn;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: #C26179;
    font-size: 32px;
    font-weight: 700;
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      background-color: #72AB97;
      border: none;
      border-radius: 5px;

      width: 304px;
      height: 48px;
      margin-top: 20px;
      padding: 0 8px;

      color: #FFFFFF;
      font-size: 24px;

      &::placeholder {
        color: #FFFFFF;
        font-weight: 600;
      }
    }

    button {
      background-color: #E99BAF;
      border: none;
      border-radius: 5px;

      margin-top: 19px;

      color: #FFFFFF;
      font-size: 20px;
      font-weight: 700;
    }
  }
`;