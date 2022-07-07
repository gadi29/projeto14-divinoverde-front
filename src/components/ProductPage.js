import axios from "axios";
import React from "react";
import styled from "styled-components";

export default function ProductPage() {
  const [load, setLoad] = React.useState(true);
  const [productData, setProductData] = React.useState();

  async function product() {
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
        <button onClick={() => product()}>pega</button>
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
        </>
      )}
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;

  img {
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
    &:hover {
      cursor: pointer;
      filter: brightness(130%);
    }
  }
`;
const Description = styled.div`
  margin: 30px;
  text-align: justify;
  width: 375px;

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  p {
    font-size: 15px;
  }
`;
