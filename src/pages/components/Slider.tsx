import React from "react";
import styled from "styled-components";

const SliderBox = styled.div`
  position: relative;
  max-width: 1080px;
  overflow-x: hidden;
  height: 600px;
  margin: 0 auto;
`;

const SliderImage = styled.img<{ show: boolean }>`
  width: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
`;

const SliderButton = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 100px;
  justify-content: space-between;

  & button {
    all: unset;
    background-color: #fff;
    width: 10px;
    height: 10px;
    border-radius: 2px;
  }
`;

interface Image {
  imageUrl: string[];
}

const Slider = ({ imageUrl }: Image) => {
  const button = Array.from({ length: imageUrl.length }, (_, index) => index);
  console.log(button);
  return (
    <SliderBox>
      {imageUrl.map((url) => (
        <SliderImage src={url} alt="로고 이미지" show={false} />
      ))}
      <SliderButton>
        {button.map((index) => (
          <button key={index} />
        ))}
      </SliderButton>
    </SliderBox>
  );
};

export default Slider;
