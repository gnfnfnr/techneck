import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import data from "../resource/data.json";

const HomeBox = styled.div`
  // max-width: 1080px;
`;
const HomeMain = styled.div`
  height: auto;
`;
const HomeArticles = styled.div`
  display: grid;
  grid-auto-rows: minmax(400px, auto);
`;

const MainImage = styled.img`
  width: 100%;
  object-fit: contain;
`;

const ArticleBox = styled.div<{ index: number }>`
  background-color: #eaeaea;
  border: 1px solid;
  transition: -webkit-transform 1s ease;
  transition: transform 1s ease;
  transition: transform 1s ease, -webkit-transfor;
  position: relative;
  z-index: ${({ index }) => index};
`;

const Test = styled.div`
  height: 1200px;
  background-color: red;
`;

const Home = () => {
  const articleBoxRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<null[] | HTMLDivElement[]>([]);
  const [currentArticle, setCurrentArticle] = useState<number>(-1);
  const [move, setMove] = useState<number>(0);
  const handleScroll = () => {
    const articleBox = articleBoxRef.current?.offsetTop || 0 / 4;
    const articleBoxHeight = articleBoxRef.current?.clientHeight || 0;
    if (articleBox - window.scrollY < 0) {
      console.log(Math.abs(articleBox - window.scrollY));
      setCurrentArticle(
        Math.abs(articleBox - window.scrollY) / (articleBoxHeight / 4)
      );
    } else {
      setCurrentArticle(-1);
    }
  };

  useEffect(() => {
    if (articleBoxRef.current) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  function changeStyle(el: HTMLElement | null, value: string) {
    if (el !== null) {
      el.style.transform = value;
    }
  }

  useEffect(() => {
    setMove(0);
  }, [Math.floor(currentArticle)]);

  useEffect(() => {
    setMove(move + Math.abs(currentArticle) * 30 - Math.floor(currentArticle));
    console.log(move);
    if (currentArticle !== -1) {
      if (
        articleRef.current[
          Math.floor(currentArticle > 0 ? currentArticle + 1 : 1)
        ]?.style !== null
      ) {
        changeStyle(
          articleRef.current[Math.floor(currentArticle)],
          `translateY(${move}px)`
        );
        // changeStyle(
        //   articleRef.current[
        //     Math.floor(currentArticle - 1 > 0 ? currentArticle - 1 : 0)
        //   ],
        //   `translateY(${move}px)`
        // );
      }
    } else {
      if (articleRef.current[0]?.style !== null) {
        // changeStyle(
        //   articleRef.current[
        //     Math.floor(currentArticle > 0 ? currentArticle - 1 : 0)
        //   ],
        //   `translateY(0px)`
        // );
      }
    }
  }, [currentArticle]);
  return (
    <HomeBox>
      <HomeMain>
        이미지 사진
        <MainImage
          src="http://dummyimage.com/1080x600.png/3C4048/ffffff"
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
            <h2>{title}</h2>
            <img src={image} alt="기사 이미지" />
            <p>{description}</p>
          </ArticleBox>
        ))}
      </HomeArticles>
      <Test>
        <div>dds</div>
      </Test>
    </HomeBox>
  );
};

export default Home;
// https://velog.io/@mamonde456/React-horizontal-scrolling-%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
