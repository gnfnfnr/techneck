import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SliderBox = styled.div`
  position: relative;
  max-width: var(--width-max);
  height: 40vh;
  margin: 0 auto;
`;

const SliderImage = styled.img<{ index: number; current: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
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
  background-color: #${({ index, current }) => (index === current ? "fff" : "ffffff40")};
  width: 10px;
  height: 10px;
  border-radius: 2px;
`;

interface Image {
  imageUrl: string[];
}

interface IUseInterval {
  (callback: () => void, interval: number): void;
}

const useInterval: IUseInterval = (callback, interval) => {
  const savedCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    let id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval]);
};

const Slider = ({ imageUrl }: Image) => {
  const [current, setCurrent] = useState<number>(0);
  const button = Array.from({ length: imageUrl.length }, (_, index) => index);
  useInterval(() => {
    setCurrent(current >= 3 ? 0 : current + 1);
  }, 5000);
  return (
    <SliderBox>
      {imageUrl.map((url, index) => (
        <SliderImage
          src={url}
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
