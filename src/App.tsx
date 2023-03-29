import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import Header from "./pages/nav/Header";
import { GlobalStyle } from "./style/global";
import Describe from "./pages/product/Describe";
import Pose from "./pages/machine/Pose";
import Requirement from "./pages/machine/Requirement";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/describe" element={<Describe />} />
        <Route path="/requirement" element={<Requirement />} />
        <Route path="/pose" element={<Pose />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
