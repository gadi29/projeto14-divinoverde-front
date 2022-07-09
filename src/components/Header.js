import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Header() {
  const navigate = useNavigate();

  return (
    <Container>
      <h1 onClick={() => navigate("/")}>DivinoVerde</h1>
      <div>
        <p>olá, user</p>
        <ion-icon name="chevron-down-outline"></ion-icon>
        <ion-icon
          name="cart-outline"
          onClick={() => navigate("/cart")}
        ></ion-icon>
      </div>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  background-color: #0e553c;

  width: 100%;
  height: 65px;
  padding: 0 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-family: "Judson", serif !important;
    color: #ffffff;
    font-size: 32px;
    cursor: pointer;
  }

  div {
    color: #ffffff;
    display: flex;
    align-items: center;

    p {
      font-size: 20px;

      margin-right: 3px;
    }

    ion-icon {
      cursor: pointer;
    }

    ion-icon:last-of-type {
      font-size: 30px;

      margin-left: 10px;
    }
  }
`;
