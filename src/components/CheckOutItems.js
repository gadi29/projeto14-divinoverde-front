import React from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext.js";
import axios from "axios";

export default function CheckOutItems({ user, userCart, userCartIndex }) {
  if (!user || !userCart) {
    return <h2>Carrinho vazio </h2>;
  } else {
    return (
      <Item>
        <img src={userCartIndex.image} alt={userCartIndex.title} />
        <Title>{userCartIndex.title}</Title>
        <Amount>{userCartIndex.amount}</Amount>
        <Price>
          R$
          {userCartIndex.price.toFixed(2).replace(".", ",")}
        </Price>
      </Item>
    );
  }
}

const Item = styled.div`
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
`;
const Title = styled.p`
  font-size: 20px;
`;
const Amount = styled.div`
  font-size: 20px;
  font-weight: 700;
`;
const Price = styled.p`
  font-size: 15px;
`;
