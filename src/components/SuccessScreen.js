import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Success() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);
  const SEG_1 = 1000;
  let timeoutID;

  setTimeout(() => setSeconds(seconds - 1), SEG_1)

  timeoutID = setTimeout(() => navigate("/"), SEG_1 * 5);

  return (
    <Container>
      <ion-icon name="checkmark-circle-outline"></ion-icon>
      <h2>Pedido Realizado com Sucesso</h2>
      <button onClick={() => {
        clearTimeout(timeoutID);
        //navigate("/");
      }}>Voltar para página inicial</button>
      <span>Redirencionando em {seconds}</span>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 90vh;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ion-icon {
    color: #72AB97;
    font-size: 140px;

    margin-bottom: 30px;
  }

  h2 {
    font-size: 23px;
  }

  button {
    background-color: #E99BAF;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;

    margin-top: 13px;
    margin-bottom: 5px;
    padding: 15px;

    font-size: 18px;
    font-weight: 600;
    color: #FFFFFF;
  }
`;