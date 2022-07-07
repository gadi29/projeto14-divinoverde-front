import React from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext.js";

export default function Signin() {
  const { userCreate, setUserCreate } = React.useContext(UserContext);

  function creatEmail(event) {
    event.preventDefault();
  }
  return (
    <>
      <Container>
        <Form nSubmit={(event) => creatEmail(event)}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setUserCreate({ ...userCreate, email: e.target.value })
            }
          ></input>
          <Confirm>
            Prosseguir com <br />o cadastro
          </Confirm>
        </Form>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
