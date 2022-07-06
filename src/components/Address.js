import React from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext.js";

export default function Address() {
  const { userCreate, setUserCreate } = React.useContext(UserContext);
  const [address, setAddress] = React.useState({
    zipCode: "",
    street: "",
    number: "",
    district: "",
    city: "",
    state: "",
  });
  function create(event) {
    event.preventDefault();
    console.log(address);
    setUserCreate({ ...userCreate, address });
    console.log(userCreate);
  }
  return (
    <Container>
      <Form onSubmit={(event) => create(event)}>
        <input
          type="number"
          placeholder="CEP"
          value={address.zipCode}
          onChange={(e) =>
            setAddress({
              ...address,
              zipCode: e.target.value,
            })
          }
        ></input>
        <input
          type="text"
          placeholder="Rua"
          value={address.street}
          onChange={(e) =>
            setAddress({
              ...address,
              street: e.target.value,
            })
          }
        ></input>
        <input
          type="number"
          placeholder="Numero"
          value={address.number}
          onChange={(e) =>
            setAddress({
              ...address,
              number: e.target.value,
            })
          }
        ></input>
        <input
          type="text"
          placeholder="Bairro"
          value={address.district}
          onChange={(e) =>
            setAddress({
              ...address,
              district: e.target.value,
            })
          }
        ></input>
        <input
          type="text"
          placeholder="Cidade"
          value={address.city}
          onChange={(e) =>
            setAddress({
              ...address,
              city: e.target.value,
            })
          }
        ></input>
        <input
          type="text"
          placeholder="Estado"
          value={address.state}
          onChange={(e) =>
            setAddress({
              ...address,
              state: e.target.value,
            })
          }
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
  height: 35px;
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
