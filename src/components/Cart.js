import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CartIten from "./CartItem.js";

export default function Cart() {
  const { userId } = useParams();
  console.log(userId);

  return (
    <Container>
      <p>Carrinho</p>
      <CartIten />
    </Container>
  );
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
