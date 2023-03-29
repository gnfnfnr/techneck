import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderBox = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #9d959c;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
`;

const HeaderNav = styled.div`
  & > ul {
    display: flex;
    gap: 10px;
  }

  & > ul > li {
    cursor: pointer;
  }

  & > ul > li:not(:last-of-type) {
    border-right: 1px solid #c8c8c8;
    padding-right: 7px;
  }
`;

const HeaderLogo = styled.img`
  height: 40px;
  object-fit: contain;
`;

const list = [
  { id: "product", title: "제품", href: "/describe" },
  { id: "webcam", title: "측정", href: "/requirement" },
];

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderBox>
      <HeaderLogo
        onClick={() => navigate("/")}
        src={require("../../img/logo.png")}
        alt="로고 이미지"
      />

      <HeaderNav>
        <ul>
          {list.map(({ id, title, href }) => (
            <li
              key={id}
              onClick={() => {
                navigate(href);
              }}
            >
              {title}
            </li>
          ))}
        </ul>
      </HeaderNav>
    </HeaderBox>
  );
};

export default Header;
