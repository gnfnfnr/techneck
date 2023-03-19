import React, { useState } from "react";
import styled from "styled-components";
import UseInterval from "./UseInterval";

const SliderBox = styled.div`
  position: relative;
  max-width: var(--width-max);
  height: 40vh;
  margin: 0 auto;
  min-height: 350px;
  background: white;
`;

const SliderImage = styled.img<{ index: number; current: number }>`
  width: 90%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: ${({ index, current }) => (index === current ? 1 : 0)};
  transition: opacity 1.5s ease-in-out;
`;

const SliderButtonsBox = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 100px;
  justify-content: space-between;
`;

const SliderButton = styled.button<{ index: number; current: number }>`
  all: unset;
  background-color: #${({ index, current }) => (index === current ? "313131" : "cdcdcd")};
  width: 10px;
  height: 10px;
  border-radius: 2px;
`;

interface Image {
  imageUrl: string[];
}

const Slider = ({ imageUrl }: Image) => {
  const [current, setCurrent] = useState<number>(0);
  const button = Array.from({ length: imageUrl.length }, (_, index) => index);
  UseInterval(() => {
    setCurrent(current >= 3 ? 0 : current + 1);
  }, 5000);
  return (
    <SliderBox>
      {imageUrl.map((url, index) => (
        <SliderImage
          src={require(`../../img/${url}`)}
          alt="로고 이미지"
          index={index}
          current={current}
          key={url}
        />
      ))}
      <SliderButtonsBox>
        {button.map((index) => (
          <SliderButton
            key={index}
            onClick={() => setCurrent(index)}
            index={index}
            current={current}
          />
        ))}
      </SliderButtonsBox>
    </SliderBox>
  );
};

export default Slider;
