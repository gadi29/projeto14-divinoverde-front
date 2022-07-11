import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CartItem from "./CartItem.js";
import { TailSpin } from "react-loader-spinner";
import UserContext from "../context/UserContext.js";
import TemporaryCart from "../context/temporaryCart.js";

export default function Cart() {
  const [load, setLoad] = React.useState(true);
  const [userCart, setUserCart] = React.useState("");
  const [total, setTotal] = React.useState(0);
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);
  const { cart, setCart } = React.useContext(TemporaryCart);
  let config = "";
  if (user) {
    config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  }

  React.useEffect(() => {
    if (user) {
      const promise = axios.get(
        `https://divinoverde-back.herokuapp.com/cart`,
        config
      );
      promise.then((res) => {
        setTotal(res.data.total);
        setUserCart(res.data.userData);
        setLoad(false);
      });
      promise.catch(() => setLoad(false));
    } else {
      setUserCart([...cart]);
      setLoad(false);
    }
  }, [cart]);

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
        <Container user={user} userCart={userCart}>
          <TailSpin />
        </Container>
      ) : (
        <Container>
          <h1>Carrinho</h1>
          {loadCartItem()}
          <button disabled={!user || !userCart} onClick={() => navigate("/checkout")}>Fechar compra</button>

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
    background-color: ${({ user, userCart }) => (user && userCart) ? "#e99baf" : "#A7A7A7"};
    color: #fff;
    border-radius: 5px;
    font-size: 20px;
    margin: 10px;
    font-weight: 700;
    &:hover {
      cursor: ${({ user, userCart }) => (user && userCart) ? "pointer" : "initial"};
      filter: ${({ user, userCart }) => (user && userCart) ? "brightness(130%)" : "initial"};
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
