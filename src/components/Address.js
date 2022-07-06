import React from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Address() {
  const navigate = useNavigate();
  const { userCreate, setUserCreate } = React.useContext(UserContext);
  const [address, setAddress] = React.useState({
    zipCode: "",
    street: "",
    number: "",
    district: "",
    city: "",
    state: "",
  });

  async function create(event) {
    event.preventDefault();
    const promise = axios.post("http://localhost:5000/signup", userCreate);
    promise.then((res) => navigate("/"));
    promise.catch((res) => alert("Houve um erro tente novamnete mais tarde"));
  }
  return (
    <Container>
      <Form onSubmit={(event) => create(event)}>
        <input
          type="number"
          placeholder="CEP"
          value={address.zipCode}
          onChange={(e) => {
            setAddress({ ...address, zipCode: e.target.value });
            setUserCreate({ ...userCreate, address });
          }}
        ></input>
        <input
          type="text"
          placeholder="Rua"
          value={address.street}
          onChange={(e) => {
            setAddress({
              ...address,
              street: e.target.value,
            });
            setUserCreate({ ...userCreate, address });
          }}
        ></input>
        <input
          type="number"
          placeholder="Numero"
          value={address.number}
          onChange={(e) => {
            setAddress({
              ...address,
              number: e.target.value,
            });
            setUserCreate({ ...userCreate, address });
          }}
        ></input>
        <input
          type="text"
          placeholder="Bairro"
          value={address.district}
          onChange={(e) => {
            setAddress({
              ...address,
              district: e.target.value,
            });
            setUserCreate({ ...userCreate, address });
          }}
        ></input>
        <input
          type="text"
          placeholder="Cidade"
          value={address.city}
          onChange={(e) => {
            setAddress({
              ...address,
              city: e.target.value,
            });
            setUserCreate({ ...userCreate, address });
          }}
        ></input>
        <input
          type="text"
          placeholder="Estado"
          value={address.state}
          onChange={(e) => {
            setAddress({
              ...address,
              state: e.target.value,
            });
            setUserCreate({ ...userCreate, address });
          }}
        ></input>
        <Confirm type="submit">
          Finalizar
          <br />
          cadastro
        </Confirm>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 375px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    height: 45px;
    width: 305px;
    background-color: #72ab97;
    border-radius: 5px;
    border: none;
    margin-bottom: 20px;
    padding: 5px;
    box-sizing: border-box;

    &::placeholder {
      color: #fff;
      font-size: 20px;
    }
  }
`;
const Confirm = styled.button`
  height: 55px;
  width: 133px;
  border-radius: 5px;
  background-color: #e99baf;
  border: none;
  color: #fff;
  font-size: 20px;

  &:hover {
    cursor: pointer;
    filter: brightness(130%);
  }
`;
