import React, { useState } from "react";
import styled from "styled-components";
import UseInterval from "../components/UseInterval";
import data from "../../resource/product.json";

const DescribeBox = styled.main`
  margin: var(--height-header) auto 0;
  height: 90vh;
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DescribeTitleBox = styled.div`
  title-align: center;

  & h2 {
    font-size: 24px;
    font-weight: bold;
  }
`;

const DescribeImage = styled.img<{ index: number; current: number }>`
  position: relative;
  object-fit: contain;
  opacity: ${({ index, current }) => (index === current ? "100" : "80")}%;
  mix-blend-mode: multiply;

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
const DescribeTextBox = styled.div`
  width: 30%;
  min-width: 300px;
  & h3 {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 18px;
  }
  & p {
    line-height: 1.5;
  }
`;
const DescribeImageBox = styled.div`
  position: relative;
  width: 60%;
  max-width: 700px;
`;

const TextCover = styled.div`
  border-left: 3px solid darkcyan;
  padding: 10px 14px;
`;

export default function Describe() {
  const [current, setCurrent] = useState<number>(0);
  UseInterval(() => {
    setCurrent(current >= 2 ? 0 : current + 1);
  }, 5000);

  return (
    <DescribeBox>
      <DescribeTitleBox>
        <h2>거북목 교정기</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere ipsam
          iste libero earum inventore corrupti, non culpa expedita? Dolores
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
            />
          ))}
        </DescribeImageBox>
        <DescribeTextBox>
          <TextCover>
            <h3>{data[current].name}</h3>
            <p>{data[current].short}</p>
          </TextCover>
        </DescribeTextBox>
      </DescribeMain>
    </DescribeBox>
  );
}
