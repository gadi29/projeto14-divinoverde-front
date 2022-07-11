import React from "react";
import styled from "styled-components";
import { BsTrash } from "react-icons/bs";
import UserContext from "../context/UserContext.js";
import axios from "axios";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
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
  const [amount, setAmount] = React.useState(userCartIndex.amount);
  const itemId = userCartIndex._id;
  let value = amount;
  let config = "";
  if (user) {
    config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  }
  function editAmount() {
    const promise = axios.post(
      "https://divinoverde-back.herokuapp.com/cartedit",
      { value, itemId },
      config
    );

    promise.then(() => {
      console.log("ok");
    });
  }

  function deleteItem(id) {
    setLoad(true);
    const promise = axios.delete(
      `https://divinoverde-back.herokuapp.com/deleteitem/${id}`,
      config
    );
    promise.then((res) => {
      const novoCart = userCart.filter((e) => e._id !== id);
      setUserCart(novoCart);
      setTotal(
        total -
          userCart.find((e) => e._id === id).price *
            userCart.find((e) => e._id === id).amount
      );
      setLoad(false);
    });
    return;
  }
  function plus() {
    setAmount(amount + 1);
    value += 1;
    setTotal(total + userCart.find((e) => e._id === itemId).price);
    editAmount();
  }
  function minus() {
    if (amount > 1) {
      setAmount(amount - 1);
      value -= 1;
      setTotal(total - userCart.find((e) => e._id === itemId).price);
      editAmount();
    }
  }

  return (
    <Container>
      <img src={userCartIndex.image} alt={userCartIndex.title} />
      <h3>{userCartIndex.title}</h3>
      <Midlle>
        <AiOutlineMinus onClick={() => minus()} />
        <Amount>{amount}</Amount>
        <AiOutlinePlus onClick={() => plus()} />
      </Midlle>
      <RigthSide>
        <h2>
          R$
          {userCartIndex.price.toFixed(2).replace(".", ",")}
        </h2>
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
const Amount = styled.div`
  height: 20px;
  width: 20px;
  background-color: #72ab97;
  color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;
const Midlle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
