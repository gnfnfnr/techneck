import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import Header from "./pages/nav/Header";
import Product from "./pages/product/Product";
import WebCam from "./pages/machine/WebCam";
import { GlobalStyle } from "./style/global";
import Describe from "./pages/product/Describe";
import Pose from "./pages/machine/Pose";
import Blutooth from "./pages/machine/Blutooth";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/describe" element={<Describe />} />
        <Route path="/webcam" element={<WebCam />} />
        <Route path="/webcam/pose" element={<Pose />} />
        <Route path="/machine" element={<Blutooth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
