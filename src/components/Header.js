import React from "react";
import styled from 'styled-components';

function Header () {
  return (
    <Container>
      <h1>DivinoVerde</h1>
      <p>olá, user</p>
      <ion-icon name="cart-outline"></ion-icon>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  background-color: #0E553C;

  width: 100%;
  height: 65px;
`;