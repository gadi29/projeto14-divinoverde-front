import React from "react";
import styled from "styled-components";
import { BsTrash } from "react-icons/bs";
import UserContext from "../context/UserContext.js";
import axios from "axios";

import { TailSpin } from "react-loader-spinner";

export default function CartItem({
  userCartIndex,
  userCart,
  setUserCart,
  setTotal,
  total,
}) {
  const { user, setUser } = React.useContext(UserContext);
  const [load, setLoad] = React.useState(false);
  let config = "";
  if (user) {
    config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  }
  function deleteItem(id) {
    console.log("vai");
    setLoad(true);
    const promise = axios.delete(
      `http://localhost:5000/deleteitem/${id}`,
      config
    );
    promise.then((res) => {
      const novoCart = userCart.filter((e) => e._id !== id);
      setUserCart(novoCart);
      setTotal(total - userCart.find((e) => e._id === id).price);
      setLoad(false);
    });
  }

  return (
    <Container>
      <img src={userCartIndex.image} alt={userCartIndex.title} />
      <h3>{userCartIndex.title}</h3>
      <RigthSide>
        <h2>R$ {userCartIndex.price.toFixed(2).replace(".", ",")}</h2>
        {load ? (
          <TailSpin height={20} />
        ) : (
          <BsTrash onClick={(e) => deleteItem(userCartIndex._id)} />
        )}
      </RigthSide>
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
  h2 {
    margin: 5px;
  }
`;
const RigthSide = styled.div`
  display: flex;
  align-items: center;
`;
const Load = styled.div`
  height: 50px;
  width: 500px;
  background-color: aliceblue;
`;
