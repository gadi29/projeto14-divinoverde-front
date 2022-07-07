import React from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext.js";
import { useNavigate } from "react-router-dom";
import joi from "joi";

export default function Signup() {
  const navigate = useNavigate();
  const { userCreate, setUserCreate } = React.useContext(UserContext);
  const [userData, setUserData] = React.useState({
    CPF: "",
    name: "",
    phone: "",
    birthDate: "",
    password: "",
    repeat_password: "",
  });

  function create(event) {
    event.preventDefault();
    const signupSchema = joi.object({
      CPF: joi.number().required(),
      name: joi.string().trim().required(),

      phone: joi.number(),
      birthDate: joi.string().required(),
      password: joi.string().required(),
      repeat_password: joi.ref("password"),
    });
    const { error } = signupSchema.validate(userData);
    if (!error) {
      setUserCreate({ ...userCreate, ...userData });
      navigate("/address");
    } else {
      return alert(error.details[0].message);
    }
    return;
  }

  return (
    <Container>
      <Form onSubmit={(event) => create(event)}>
        <input
          type="number"
          placeholder="CPF"
          value={userData.CPF}
          onChange={(e) => setUserData({ ...userData, CPF: e.target.value })}
        ></input>
        <input
          type="text"
          placeholder="Nome"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        ></input>
        <input
          type="number"
          placeholder="Telefone"
          value={userData.phone}
          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
        ></input>
        <input
          type="date"
          placeholder="Data de nascimento"
          value={userData.birthDate}
          onChange={(e) =>
            setUserData({ ...userData, birthDate: e.target.value })
          }
        ></input>
        <input
          type="password"
          placeholder="Senha"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        ></input>
        <input
          type="password"
          placeholder="Confirme sua senha"
          value={userData.repeat_password}
          onChange={(e) =>
            setUserData({ ...userData, repeat_password: e.target.value })
          }
        ></input>
        <Confirm type="submit">Confirmar</Confirm>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
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
