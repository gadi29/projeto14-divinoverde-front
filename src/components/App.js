import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header.js";
import SignIn from "./SignIn.js";
import Signup from "./Signup.js";
import UserContext from "../context/UserContext";
import Address from "./Address.js";
import ProductPage from "./ProductPage.js";
import Signin from "./Signin.js";

function App() {
  const [userCreate, setUserCreate] = React.useState();
  const [user, setUser] = React.useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <UserContext.Provider value={{ userCreate, setUserCreate }}>
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/address" element={<Address />} />
          </UserContext.Provider>
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
