import React from "react";
import styled from "styled-components";

const HeaderBox = styled.header`
  position: fixed;
  width: 100vw;
  height: 50px;
  top: 0;
  left: 0;
  background-color: #eaeaea;
  z-index: 999;
`;

const Header = () => {
  return (
    <HeaderBox>
      <img
        src="http://dummyimage.com/44x44.png/cc0000/ffffff"
        alt="로고 이미지"
      />
    </HeaderBox>
  );
};

export default Header;
