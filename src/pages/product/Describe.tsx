import React, { useState } from "react";
import styled from "styled-components";
import UseInterval from "../components/UseInterval";
import data from "../../resource/product.json";
import Detail from "./Detail";

const DescribeBox = styled.main`
  min-height: 90vh;
  margin: var(--height-header) auto 0;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 25px;
`;

const DescribeTitleBox = styled.div`
  text-align: center;
  margin-bottom: 30px;
  & h2 {
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 25px;
  }
  & p {
    line-height: 1.4;
    width: 60%;
    margin: 0 auto;
    color: #363636;
  }

  @media screen and (max-width: 400px) {
    & p {
      line-height: 1.4;
      width: 100%;
      margin: 0 auto;
    }
  }
`;

const DescribeImage = styled.img<{ index: number; current: number }>`
  position: relative;
  object-fit: contain;
  opacity: ${({ index, current }) => (index === current ? "100" : "60")}%;
  mix-blend-mode: multiply;
  transition: opacity 1.5s ease-in-out;

  &:first-child {
    width: 100%;
    bottom: 0;
  }

  &:nth-child(2) {
    width: 80%;
    left: 10%;
  }

  &:last-child {
    width: 100%;
    top: 0;
  }
`;

const DescribeMain = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
`;
const DescribeTextBox = styled.div<{ locate: string }>`
  width: 30%;
  align-self: ${({ locate }) => locate};

  & h3 {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 18px;
  }
  & p {
    line-height: 1.5;
  }

  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;
const DescribeImageBox = styled.div`
  position: relative;
  width: 60%;
  max-width: 400px;
`;

const TextContent = styled.div`
  border-left: 3px solid darkcyan;
  padding: 10px 14px;
`;

const TextDetail = styled.div`
  padding-top: 10px;
  float: right;
  color: #7b7b7b;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
`;

const TextBox = styled.div<{ current: number }>`
  transition: opacity 1s ease-in-out;
  margin-bottom: 25px;
`;

export default function Describe() {
  const [current, setCurrent] = useState<number>(0);
  UseInterval(() => {
    setCurrent(current >= 2 ? 0 : current + 1);
  }, 5000);
  const [show, setShow] = useState<boolean>(false);
  const [showNumber, setShowNumber] = useState<number>(0);
  return (
    <DescribeBox>
      <DescribeTitleBox>
        <h2>거북목 교정기</h2>
        <p>
          장시간 PC 사용, 조깅 등의 가벼운 운동, 책을 읽기, 장시간 스마트폰
          사용한다면 AI의 판단과 거북목 교정기을 이용해서 거북목 여부를 알 수
          있다.
        </p>
      </DescribeTitleBox>
      <DescribeMain>
        <DescribeImageBox>
          {data.map(({ id, image }, index) => (
            <DescribeImage
              key={id}
              src={require(`../../img/${image}`)}
              current={current}
              index={index}
              onClick={() => setCurrent(index)}
            />
          ))}
        </DescribeImageBox>
        <DescribeTextBox locate={data[current].locate}>
          <TextBox current={current}>
            <TextContent>
              <h3>{data[current].name}</h3>
              <p>{data[current].short}</p>
            </TextContent>
            <TextDetail
              onClick={() => {
                setShow(true);
                setShowNumber(current);
              }}
            >
              자세히
            </TextDetail>
          </TextBox>
        </DescribeTextBox>
      </DescribeMain>
      {show && <Detail setShow={setShow} current={showNumber} />}
    </DescribeBox>
  );
}
