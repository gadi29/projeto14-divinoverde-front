import axios from "axios";
import React from "react";
import styled from "styled-components";

export default function ProductPage() {
  const [load, setLoad] = React.useState(false);
  const [productData, setProductData] = React.useState();
  async function product() {
    setLoad(true);
    const promise = axios.get(
      `http://localhost:5000/product/62c72d84cd4ed38e4c4adc75`
    );
    promise.then((res) => {
      setProductData(res.data);
      console.log(res.data);
      setLoad(false);
    });
  }

  return (
    <>
      {load ? (
        <p>loading</p>
      ) : (
        <>
          <Container>
            <img src={productData.image} alt={productData.title} />
            <h1>{productData.title} </h1>
            <h2>R$ {productData.price} </h2>
            <button>Adicionar carrinho</button>
            <Description>
              <h3>Descrição</h3>
              <p>{productData.description} </p>
            </Description>
          </Container>
          <button onClick={() => product()}>pega</button>
        </>
      )}
    </>
  );
}

const Container = styled.div`
  width: 375px;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    width: 230px;
    height: 235px;
  }
  h1 {
    font-size: 20px;
  }
  h2 {
    font-size: 15px;
  }
  button {
    border: none;
    width: 170px;
    height: 35px;
    background-color: #e99baf;
    color: #fff;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      filter: brightness(130%);
    }
  }
`;
const Description = styled.div``;
