import React from "react";
import styled from "styled-components";
import { BsTrash } from "react-icons/bs";
import UserContext from "../context/UserContext.js";
import axios from "axios";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export default function CartItem({
  userCartIndex,
  userCart,
  setTotal,
  total,
  deleteItem,
}) {
  const [load, setLoad] = React.useState(false);
  const { user, setUser } = React.useContext(UserContext);
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
      setLoad(false);
    });
  }

  function plus() {
    setLoad(true);
    setAmount(amount + 1);
    value += 1;
    setTotal(total + userCart.find((e) => e._id === itemId).price);
    editAmount();
  }
  function minus() {
    setLoad(true);
    if (value > 1) {
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
        <AiOutlineMinus
          onClick={() => {
            load ? <></> : minus();
          }}
        />
        <Amount>{amount}</Amount>
        <AiOutlinePlus
          onClick={() => {
            load ? <></> : plus();
          }}
        />

      </Midlle>
      <RigthSide>
        <h2>
          R$
          {userCartIndex.price.toFixed(2).replace(".", ",")}
        </h2>
        <BsTrash onClick={(e) => deleteItem(userCartIndex._id)} />
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
    border-radius: 5px;
    object-fit: cover;
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

  .trash {
    cursor: pointer;
  }
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

  .icon {
    cursor: pointer;
  }
`;
