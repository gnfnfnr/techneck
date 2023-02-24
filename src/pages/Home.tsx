import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import data from "../resource/data.json";
import Slider from "./components/Slider";

const HomeBox = styled.div`
  margin-top: 60px;
  min-height: 100vh;
  width: 100%;
  position: relative;
`;

const HomeArticles = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 400px);
  background: #eaeaea;
  position: relative;
  width: 100%;
`;

const ArticleBox = styled.div<{ index: number }>`
  position: sticky;
  background-color: #eaeaea;
  top: 20px;
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
  transition: bottom 0.2s ease;
  height: 50vh;
  background-color: red;
  width: 100%;
  z-index: 10;
  position: absolute;
  bottom: -400px;
  & div {
    background-color: blue;
  }
`;

const DescriptionBox = styled.p`
  font-size: 3rem;
  font-weight: bold;
  word-spacing: 4px;
  line-height: 3rem;
  word-break: break-all;
  overflow: hidden;
  padding: 20px;
`;

function changeStyle(el: HTMLElement | null, value: string) {
  if (el !== null) {
    el.style.bottom = value;
  }
}
const Home = () => {
  const articleBoxRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<null[] | HTMLDivElement[]>([]);
  const [currentArticle, setCurrentArticle] = useState<number>(0);
  const [move, setMove] = useState<number>(-800);
  const advertisementRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const articleBox = (articleBoxRef.current?.offsetTop || 0) + 1150;
    setCurrentArticle(articleBox - window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log("df");
    console.log(currentArticle);
    setMove(-400 - currentArticle * 0.3);
    changeStyle(advertisementRef.current, `${move}px`);
  }, [currentArticle]);
  return (
    <HomeBox>
      <Slider
        imageUrl={[
          "http://dummyimage.com/1080x600.png/3d3d3d/000000",
          "http://dummyimage.com/1080x600.png/4A4543/000000",
          "http://dummyimage.com/1080x600.png/D6D6D6/000000",
          "http://dummyimage.com/1080x600.png/573D3D/000000",
        ]}
      />
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
        <DescriptionBox>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere ipsam
          iste libero earum inventore corrupti, non culpa expedita? Dolores
        </DescriptionBox>
      </HomeArticles>
      <HomeAdvertisement ref={advertisementRef}>
        <div>거북 목인 지 확인하러 가기</div>
      </HomeAdvertisement>
    </HomeBox>
  );
};

export default Home;
