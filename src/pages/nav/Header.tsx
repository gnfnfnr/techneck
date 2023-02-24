import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderBox = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #eaeaea;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
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
`;

const list = [
  { id: "intro", title: "소개", href: "/intro" },
  { id: "product", title: "제품", href: "/product" },
];

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderBox>
      <img
        onClick={() => navigate("/")}
        src="http://dummyimage.com/44x50.png/cc0000/ffffff"
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
