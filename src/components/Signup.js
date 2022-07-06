import React from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext.js";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [createUser, setCreateUser] = React.useState({
    CPF: "",
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
    repeat_password: "",
  });
  const { userCreate, setUserCreate } = React.useContext(UserContext);

  function create(event) {
    event.preventDefault();
    setUserCreate({ ...createUser });
    navigate("/address");
  }
  console.log("oii");
  return (
    <Container>
      <Form onSubmit={(event) => create(event)}>
        <input
          type="number"
          placeholder="CPF"
          value={createUser.CPF}
          onChange={(e) =>
            setCreateUser({ ...createUser, CPF: e.target.value })
          }
        ></input>
        <input
          type="text"
          placeholder="Nome"
          value={createUser.name}
          onChange={(e) =>
            setCreateUser({ ...createUser, name: e.target.value })
          }
        ></input>
        <input
          type="number"
          placeholder="Telefone"
          value={createUser.phone}
          onChange={(e) =>
            setCreateUser({ ...createUser, phone: e.target.value })
          }
        ></input>
        <input
          type="date"
          placeholder="Data de nascimento"
          value={createUser.birthDate}
          onChange={(e) =>
            setCreateUser({ ...createUser, birthDate: e.target.value })
          }
        ></input>
        <input
          type="password"
          placeholder="Senha"
          value={createUser.password}
          onChange={(e) =>
            setCreateUser({ ...createUser, password: e.target.value })
          }
        ></input>
        <input
          type="password"
          placeholder="Confirme sua senha"
          value={createUser.repeat_password}
          onChange={(e) =>
            setCreateUser({ ...createUser, repeat_password: e.target.value })
          }
        ></input>
        <Confirm type="submit">Confirmar</Confirm>
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
