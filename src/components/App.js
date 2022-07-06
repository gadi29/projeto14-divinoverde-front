import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header.js";
import Signup from "./Signup.js";
import UserContext from "../context/UserContext";
import Address from "./Address.js";

function App() {
  const [userCreate, setUserCreate] = React.useState();
  return (
    <UserContext.Provider value={{ userCreate, setUserCreate }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/address" element={<Address />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
