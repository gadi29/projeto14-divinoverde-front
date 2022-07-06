import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header.js";
import Signup from "./Signup.js";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
