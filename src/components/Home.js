import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";

function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [listCategories, setListCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);

  useEffect((() => {
    let promisse = null;

    if (!category || category === "Todas") {
      promisse = axios.get('http://localhost:5000/products');
    } else {
      promisse = axios.get(`http://localhost:5000/products?category=${category}`);
    }

    setShowCategories(false);

    promisse.then((r) => {
      setProducts([...r.data]);
      setLoad(false);
    });
    promisse.catch((r) => {
      alert(`Erro ${r.response.status}.`);
    });
  }), [category]);

  useEffect((() => {
    const promisse = axios.get('http://localhost:5000/categories');

    promisse.then(r => {
      setListCategories([ "Todas", ...r.data ]);
    });
    promisse.catch(r => {
      alert(`Erro ${r.response.status}.`)
    });
  }), []);

  return (
    <Container>
      <Filter>
        <CategorySelect>
          <h2>Categorias</h2>
          <ion-icon name="chevron-down-outline" onClick={() => setShowCategories(!showCategories)}></ion-icon>
        </CategorySelect>
        <ListCategories showCategories={showCategories}>
          <ul>
            {listCategories.map((category, index) => 
              <li key={index} onClick={() => setCategory(category)}>{category}</li>)}
          </ul>
        </ListCategories>
      </Filter>
      {load ? (
        <Loading>
          <TailSpin />
        </Loading>
      ) : (
        <ProductList>
          {products.map((product, index) => (
            <Product
              key={index}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img src={product.image} alt="Imagem do produto" />
              <h3>{product.title}</h3>
              <h4>R${product.price.toFixed(2).replace(".", ",")}</h4>
            </Product>
          ))}
        </ProductList>
      )}
    </Container>
  );
}

export default Home;

const Container = styled.div`
  padding: 0 15px;
`;

const Filter = styled.div`
  margin-top: 25px;
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;
`;

const CategorySelect = styled.div`
  display: flex;

  h2 {
    font-size: 18px;
    font-weight: 700;

    margin-right: 3px;
  }

  ion-icon {
    cursor: pointer;
  }
`;

const ListCategories = styled.div`
  background-color: #72AB97;
  border-radius: 5px;

  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100px;
  margin-top: 23px;
  padding: 0 5px;
  padding-top: 10px;

  display: ${({ showCategories }) => showCategories ? "inherit" : "none"};

  li {
    color: #FFFFFF;
    font-size: 18px;
    cursor: pointer;

    text-align: center;

    margin-bottom: 5px;
  }
`;

const ProductList = styled.div`
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Product = styled.div`
  margin-bottom: 25px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    border-radius: 5px;

    width: 129px;
    height: 129px;
    margin-bottom: 5px;
    object-fit: cover;
  }

  h3 {
    font-size: 16px;
  }

  h4 {
    font-size: 12px;
  }
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 100vw;
`;
