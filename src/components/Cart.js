import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CartItem from "./CartItem.js";
import { TailSpin } from "react-loader-spinner";

export default function Cart() {
  const [load, setLoad] = React.useState(true);
  const [userCart, setUserCart] = React.useState("");
  const { userId } = useParams();
  console.log(userId);

  React.useEffect(() => {
    const promise = axios.get(`http://localhost:5000/cart/${userId}`);
    promise.then((res) => {
      setUserCart(res.data);
      setLoad(false);
    });
  }, []);

  return (
    <>
      {load ? (
        <Container>
          <TailSpin />
        </Container>
      ) : (
        <Container>
          <p>Carrinho</p>
          {userCart.map((e, index) => (
            <CartItem userCart={userCart[index]} key={index} />
          ))}
        </Container>
      )}
    </>
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
