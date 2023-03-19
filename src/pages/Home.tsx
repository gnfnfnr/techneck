import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import data from "../resource/data.json";
import Slider from "./components/Slider";

const HomeBox = styled.main`
  margin-top: var(--height-header);
  min-height: 100vh;
  width: 100%;
  position: relative;
`;

const HomeArticles = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 420px);
  background: var(--main-color);
  position: relative;
  width: 100%;
`;

const ArticleBox = styled.div<{ index: number }>`
  max-width: var(--width-max);
  position: sticky;
  background-color: var(--main-color);
  top: 20px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  align-items: flex-${({ index }) => (index % 2 ? "end" : "start")};
  padding: 20px 25px;
  box-sizing: border-box;
  justify-content: space-evenly;
  @media screen and (max-width: 500px) {
    align-items: center;
  }
`;

const ArticleTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

const HomeAdvertisement = styled.section`
  transition: bottom 0.2s ease;
  height: 400px;
  background-color: transparent;
  width: 100%;
  z-index: 10;
  position: absolute;
  bottom: -400px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const AdvertisementBox = styled.div`
  padding: 25px 20px;
  box-sizing: border-box;
  width: 80%;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between; ;
`;

const ArticleImage = styled.img<{ index: number }>`
  max-width: 50%;
  object-fit: contain;
  position: absolute;
  max-height: 50%;
  ${({ index }) => (index % 2 ? "left" : "right")} : 25px;
  @media screen and (max-width: 500px) {
    position: inherit;
    width: 100%;
  }
`;

const ArticleDescription = styled.p<{ index: number }>`
  width: 45%;
  text-align: ${({ index }) => (index % 2 ? "end" : "start")};
  line-height: 1.4;
  @media screen and (max-width: 500px) {
    width: 100%;
    text-align: center;
  }
`;

const ArticleDetail = styled.div`
  border-bottom: 2px solid;
  padding-bottom: 6px;
  color: #6a6a6a;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
`;

const AdvertisementWord = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
const AdvertisementButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: end;
`;

function changeStyle(el: HTMLElement | null, value: string) {
  if (el !== null) {
    el.style.bottom = value;
  }
}
const Home = () => {
  const navigate = useNavigate();
  const articleBoxRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<null[] | HTMLDivElement[]>([]);
  const [currentArticle, setCurrentArticle] = useState<number>(0);
  const [move, setMove] = useState<number>(-800);
  const advertisementRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const articleBox = (articleBoxRef.current?.offsetTop || 0) + 1150;
    if (window.scrollY >= 1100) {
      setCurrentArticle(articleBox - window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMove(-400 - currentArticle * 0.3);
    changeStyle(advertisementRef.current, `${move}px`);
  }, [currentArticle]);
  return (
    <HomeBox>
      <Slider
        imageUrl={[
          "upDrawing.png",
          "complete.png",
          "logo.png",
          "description.png",
        ]}
      />
      <HomeArticles ref={articleBoxRef}>
        {data.map(({ id, title, image, description, url }, index) => (
          <ArticleBox
            key={id}
            ref={(elem) => (articleRef.current[index] = elem)}
            index={index}
          >
            <ArticleTitle>{title}</ArticleTitle>
            <ArticleImage
              index={index}
              src={require(`../img/${image}`)}
              alt="기사 이미지"
            />
            <ArticleDescription index={index}>
              {description.split("\n").map((line) => (
                <>
                  {line}
                  <br />
                </>
              ))}
            </ArticleDescription>
            {url && (
              <ArticleDetail onClick={() => navigate(url)}>
                자세히 보기
              </ArticleDetail>
            )}
          </ArticleBox>
        ))}
        <DescriptionBox />
      </HomeArticles>
      <HomeAdvertisement ref={advertisementRef}>
        <AdvertisementBox>
          <AdvertisementWord>거북목인지 확인하러 가기</AdvertisementWord>
          <AdvertisementButton onClick={() => navigate("/webcam")}>
            바로가기
            <img alt="이동" src={require("../img/arrowRight.png")} />
          </AdvertisementButton>
        </AdvertisementBox>
      </HomeAdvertisement>
    </HomeBox>
  );
};

export default Home;
