import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import CartItem from "./CartItem.js";
import { TailSpin } from "react-loader-spinner";
import UserContext from "../context/UserContext.js";

export default function Cart() {
  const [load, setLoad] = React.useState(true);
  const [userCart, setUserCart] = React.useState("");
  const { userId } = useParams();
  const [total, setTotal] = React.useState(0);
  const { user, setUser } = React.useContext(UserContext);
  let config = "";
  if (user) {
    config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  }

  React.useEffect(() => {
    const promise = axios.get(`http://localhost:5000/cart`, config);
    promise.then((res) => {
      setTotal(res.data.total);
      setUserCart(res.data.userData);
      setLoad(false);
    });
    promise.catch(() => setLoad(false));
  }, []);

  function loadCartItem() {
    if (userCart) {
      return (
        <>
          {userCart.map((e, index) => (
            <CartItem
              userCartIndex={userCart[index]}
              key={index}
              userCart={userCart}
              setUserCart={setUserCart}
              setTotal={setTotal}
              total={total}
            />
          ))}
          <p>Valor total R$ {total.toFixed(2).replace(".", ",")}</p>
        </>
      );
    }
    if (!user || !userCart) {
      return <h2>Carrinho vazio </h2>;
    }
  }
  return (
    <>
      {load ? (
        <Container>
          <TailSpin />
        </Container>
      ) : (
        <Container>
          <h1>Carrinho</h1>
          {loadCartItem()}
          <button>Fechar compra</button>

          <Link to="/">Continuar comprando</Link>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;

  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  h1 {
    width: 375px;
    font-size: 30px;
    font-weight: 700;
    padding: 20px;
  }
  p {
    width: 375px;
    font-size: 25px;
    text-align: end;
  }
  button {
    border: none;
    width: 170px;
    height: 35px;
    background-color: #e99baf;
    color: #fff;
    border-radius: 5px;
    font-size: 20px;
    margin: 10px;
    font-weight: 700;
    &:hover {
      cursor: pointer;
      filter: brightness(130%);
    }
  }
  a {
    text-decoration: none;
    font-size: 16px;
    font-weight: 700;
    color: #000;
    &:hover {
      cursor: pointer;
      filter: brightness(130%);
    }
  }
`;
