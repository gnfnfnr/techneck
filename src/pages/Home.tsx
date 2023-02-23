import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import data from "../resource/data.json";

const HomeBox = styled.div`
  margin-top: 50px;
  min-height: 100vh;
  width: 100%;
`;
const HomeMain = styled.div`
  height: auto;
`;
const HomeArticles = styled.div`
  display: grid;
  grid-auto-rows: 400px;
  background: #eaeaea;
  position: relative;
  height: 1800px;
  width: 100%;
`;

const MainImage = styled.img`
  width: 100%;
  object-fit: contain;
`;

const ArticleBox = styled.div<{ index: number }>`
  position: sticky;
  background-color: #eaeaea;
  transition: -webkit-top 1s ease;
  transition: top 2s ease;
  transition: top 1s ease, -webkit-transfor;
  z-index: ${({ index }) => index};
  top: 50px;
  background: orange;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ArticleTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

const Test = styled.div`
  // transition: top 0.2s ease, -webkit-transfor;
  height: 800px;
  background-color: red;
  width: 100%;
  z-index: 10;
  position: relative;
  & div {
    height: 900px;
    background-color: blue;
  }
`;

interface Movement {
  [key: number]: number;
}

const Home = () => {
  const articleBoxRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<null[] | HTMLDivElement[]>([]);
  const [currentArticle, setCurrentArticle] = useState<number>(0);
  const [move, setMove] = useState<number>(0);
  const testRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const articleBox = (articleBoxRef.current?.offsetTop || 0) + 1150;
    if (articleBox - window.scrollY < 0) {
      setCurrentArticle(articleBox - window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function changeStyle(el: HTMLElement | null, value: string) {
    if (el !== null) {
      el.style.top = value;
    }
  }

  useEffect(() => {
    setMove(currentArticle * 0.4);
    changeStyle(testRef.current, `${move}px`);
  }, [currentArticle]);
  return (
    <HomeBox>
      <HomeMain>
        <MainImage
          src="http://dummyimage.com/1080x600.png/3d3d3d/000000"
          alt="로고 이미지"
        />
      </HomeMain>
      <HomeArticles ref={articleBoxRef}>
        {data.map(({ id, title, image, description }, index) => (
          <ArticleBox
            key={id}
            ref={(elem) => (articleRef.current[index] = elem)}
            index={index}
          >
            <ArticleTitle>{title}</ArticleTitle>
            <img src={image} alt="기사 이미지" />
            <p>{description}</p>
          </ArticleBox>
        ))}
        <div>로고</div>
      </HomeArticles>
      <Test ref={testRef}>
        <div>dds</div>
      </Test>
    </HomeBox>
  );
};

export default Home;
// https://velog.io/@mamonde456/React-horizontal-scrolling-%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
