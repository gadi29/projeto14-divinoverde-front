import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header.js";
import SignIn from "./SignIn.js";
import Signup from "./Signup.js";
import Address from "./Address.js";
import Home from "./Home.js";
import ProductPage from "./ProductPage.js";
import Cart from "./Cart.js";
import CheckOut from "./CheckOut.js";

import UserContext from "../context/UserContext";

function App() {
  const [userCreate, setUserCreate] = React.useState();
  const [user, setUser] = React.useState();

  return (
    <UserContext.Provider value={{ user, setUser, userCreate, setUserCreate }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/address" element={<Address />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
