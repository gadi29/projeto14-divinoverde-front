import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../context/UserContext.js";

function Header() {
  const [showWindow, setShowWindow] = useState(false);
  const { user, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Container>
      <h1 onClick={() => navigate("/")}>DivinoVerde</h1>
      <div>
        <p>olá, {user ? user.name : "Cliente"}</p>
        <ion-icon name="chevron-down-outline" onClick={() => setShowWindow(!showWindow)}></ion-icon>
        <SignInSignOutWindow showWindow={showWindow}>
          <Login user={user} onClick={() => {
            navigate('/sign-in');
            setShowWindow(false);
            }}>Login</Login>
          <Exit user={user} onClick={() => {
            setUser(null);
            setShowWindow(false);
            }}>Sair</Exit>
        </SignInSignOutWindow>
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
  z-index: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

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

const SignInSignOutWindow = styled.div`
  background-color: #72AB97;
  border-radius: 5px;
  
  width: 108px;
  padding: 5px 0;
  margin-top: 75px;

  display: flex;
  flex-direction: column;
  position: absolute;

  display: ${({ showWindow }) => showWindow ? "inherit" : "none"} !important;

  h4 {
    font-size: 20px;
    cursor: pointer;
  }
`;

const Login = styled.h4`
  display: ${({ user }) => user ? "none" : "inherit"};
`;

const Exit = styled.h4`
  display: ${({ user }) => user ? "inherit" : "none"};
`;
