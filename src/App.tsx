import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import Header from "./pages/nav/Header";
import Product from "./pages/Product";
import WebCam from "./pages/machine/WebCam";
import { GlobalStyle } from "./style/global";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/product" element={<Product />} />
        <Route path="/webcam" element={<WebCam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
