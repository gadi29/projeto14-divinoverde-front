import axios from "axios";
import React from "react";
import styled from "styled-components";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext.js";

export default function ProductPage() {
  const [load, setLoad] = React.useState(true);
  const [loadAdd, setLoadAdd] = React.useState(false);
  const [productData, setProductData] = React.useState();
  const [addedItem, setAddedItem] = React.useState(false);
  const { id } = useParams();
  const { user, setUser } = React.useContext(UserContext);
  const [alreadyAddInCart, setAlreadyAddInCart] = React.useState(false);
  let config = "";
  if (user) {
    config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  }

  const navigate = useNavigate();

  React.useEffect(() => {
    const promise = axios.get(
      `https://divinoverde-back.herokuapp.com/product/${id}`
    );
    promise.then((res) => {
      setProductData(res.data);
      setLoad(false);
    });
  }, []);

  const promise = axios.get(
    `https://divinoverde-back.herokuapp.com/cart`,
    config
  );

  promise.then((r) => {
    const cartUser = r.data.userData;
    setAlreadyAddInCart((cartUser.filter(product => product._id === productData._id)).length !== 0);
  });

  function addCart(id) {
    setLoadAdd(true);
    setAlreadyAddInCart(true);
    if(user) {
      const promise = axios.post(
        `https://divinoverde-back.herokuapp.com/cart/${id}`,
        {},
        config
      );
      promise.then(() => {
        setAddedItem(true);
        console.log("Adicionado com sucesso");
      });
    } else {
      alert("Você precisa estar logado para adicionar um item ao carrinho!");
      navigate('/sign-in');
    }
  }

  return (
    <>
      {load ? (
        <Container>
          <TailSpin />
        </Container>
      ) : (
        <>
          <Container alreadyAddInCart={alreadyAddInCart}>
            <img src={productData.image} alt={productData.title} />
            <h1>{productData.title} </h1>
            <h2>R$ {productData.price.toFixed(2).replace(".", ",")} </h2>

            <button disabled={alreadyAddInCart} onClick={() => addCart(productData._id)}>
              {alreadyAddInCart ? "Adicionado" : "Adicionar item"}

            </button>

            <Description>
              <h3>Descrição</h3>
              <p>{productData.description} </p>
            </Description>
          </Container>
        </>
      )}
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 105px;

  img {
    border-radius: 5px;
    object-fit: cover;
    width: 230px;
    height: 235px;
    margin: 10px;
  }
  h1 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 15px;
    margin-bottom: 12px;
  }
  button {
    border: none;
    width: 170px;
    height: 35px;
    background-color: #e99baf;
    color: #fff;
    border-radius: 5px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: ${({ alreadyAddInCart }) => alreadyAddInCart ? "initial" : "pointer"};
      filter: ${({ alreadyAddInCart }) => alreadyAddInCart ? "initial" : "brightness(130%)"};
    }
  }
`;
const Description = styled.div`
  margin: 30px;
  padding: 30px;
  text-align: justify;
  width: 375px;

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  p {
    font-size: 15px;
    margin-left: 30px;
  }
`;
