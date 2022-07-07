import React from "react";
import styled from "styled-components";

export default function CartItem({ userCart }) {
  return (
    <Container>
      <img src={userCart.image} alt={userCart.title} />
      <h1>{userCart.title}</h1>
      <h2>R$ {userCart.price}</h2>
    </Container>
  );
}

const Container = styled.div`
  height: 65px;
  width: 375px;
  padding: 15px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    height: 65px;
    width: 65px;
    margin: 10px;
  }
  h1 {
    font-size: 20px;
  }
`;
