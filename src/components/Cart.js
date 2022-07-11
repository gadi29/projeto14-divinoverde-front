import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CartItem from "./CartItem.js";
import { TailSpin } from "react-loader-spinner";
import UserContext from "../context/UserContext.js";

export default function Cart() {
  const [load, setLoad] = React.useState(true);
  const [loadItem, setLoadItem] = React.useState(false);
  const [userCart, setUserCart] = React.useState("");
  const [total, setTotal] = React.useState(0);
  const navigate = useNavigate();
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

    loadPage();
  }, []);

  function deleteItem(id) {
    setLoadItem(true);
    const promise = axios.delete(
      `https://divinoverde-back.herokuapp.com/deleteitem/${id}`,
      config
    );
    promise.then((res) => {
      const novoCart = axios.get(
        `https://divinoverde-back.herokuapp.com/cart`,
        config
      );
      novoCart.then((res) => {
        setUserCart(res.data.userData);
        setTotal(res.data.total);
        setLoadItem(false);
      });
    });
    return;
  }

  function loadPage() {
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
  }

  function loadCartItem() {
    if (userCart) {
      return (
        <>
          {userCart.map((e, index) => (
            <CartItem
              userCartIndex={e}
              userCart={userCart}
              setUserCart={setUserCart}
              setTotal={setTotal}
              total={total}
              deleteItem={deleteItem}
              key={index}
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
        <Container userCart={userCart.length > 0}>
          <h1>Carrinho</h1>
          {loadItem ? <TailSpin /> : loadCartItem()}      
          <button disabled={!user || !userCart} onClick={() => {
            if (!user) {
              navigate("/sign-in");
            } else if (userCart.length > 0) {
              navigate("/checkout");
            }
          }}>Fechar compra</button>
          <Link to="/">Continuar comprando</Link>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  width: 100vw;
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
    background-color: ${({ userCart }) => (userCart) ? "#e99baf" : "#A7A7A7"};
    color: #fff;
    border-radius: 5px;
    font-size: 20px;
    margin: 10px;
    font-weight: 700;
    &:hover {
      cursor: ${({ userCart }) => ( userCart) ? "pointer" : "initial"};
      filter: ${({ userCart }) => ( userCart) ? "brightness(130%)" : "initial"};
    }
  }
  a {
    text-decoration: none;
    font-size: 16px;
    font-weight: 700;
    color: #000;
    margin-bottom: 30px;
    &:hover {
      cursor: pointer;
      filter: brightness(130%);
    }
  }
`;
