import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import data from "../resource/data.json";
import Slider from "./components/Slider";

const HomeBox = styled.div`
  margin-top: 50px;
  min-height: 100vh;
  width: 100%;
`;
const HomeMain = styled.div`
  height: auto;
  position: relative;
`;

const HomeArticles = styled.div`
  display: grid;
  grid-auto-rows: 400px;
  background: #eaeaea;
  position: relative;
  height: 1900px;
  width: 100%;
`;

const ArticleBox = styled.div<{ index: number }>`
  position: sticky;
  background-color: #eaeaea;
  top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ArticleTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

const HomeAdvertisement = styled.div`
  transition: -webkit-top 0.5s ease;
  transition: top 0.5s ease;
  transition: top 0.5s ease, -webkit-transfor;
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

function changeStyle(el: HTMLElement | null, value: string) {
  if (el !== null) {
    el.style.top = value;
  }
}
const Home = () => {
  const articleBoxRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<null[] | HTMLDivElement[]>([]);
  const [currentArticle, setCurrentArticle] = useState<number>(0);
  const [move, setMove] = useState<number>(0);
  const advertisementRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setMove(currentArticle * 0.4);
    changeStyle(advertisementRef.current, `${move}px`);
  }, [currentArticle]);
  return (
    <HomeBox>
      <HomeMain>
        <Slider
          imageUrl={[
            "http://dummyimage.com/1080x600.png/3d3d3d/000000",
            "http://dummyimage.com/1080x600.png/4A4543/000000",
            "http://dummyimage.com/1080x600.png/D6D6D6/000000",
            "http://dummyimage.com/1080x600.png/573D3D/000000",
          ]}
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
      <HomeAdvertisement ref={advertisementRef}>
        <div>앱 다운로드 하러가기</div>
      </HomeAdvertisement>
    </HomeBox>
  );
};

export default Home;
