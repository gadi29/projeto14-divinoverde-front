import React from "react";
import styled from "styled-components";

export default function CartItem({ userCart }) {
  return (
    <Container>
      <img src={userCart.image} alt={userCart.title} />
      <h3>{userCart.title}</h3>
      <h2>R$ {userCart.price}</h2>
    </Container>
  );
}

const Container = styled.div`
  height: 65px;
  width: 375px;
  padding: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    height: 65px;
    width: 65px;
    margin: 10px;
  }
  h3 {
    font-size: 20px;
  }
`;
