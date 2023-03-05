import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface Info {
  setShow: Dispatch<SetStateAction<boolean>>;
}

const DetailBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #4141404f;
`;

const DetailSection = styled.section`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 75%;
  height: 60%;
  border-radius: 40px;
  padding: 20px;
  box-shadow: 0px 5px 5px 0px #9e9ea3;
  display: grid;
  grid-template-rows: 1fr 8.5fr;
`;

const DetailClose = styled.img`
  cursor: pointer;
`;

const DetailTitle = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & h2 {
    width: 100%;
    font-size: 20px;
    font-weight: bold;
  }
`;
const DetailMain = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 10px;
`;
const DetailDescription = styled.p`
  width: 60%;
`;
const DetailImg = styled.img`
  width: 40%;
  min-width: 200px;
`;

export default function Detail({ setShow }: Info) {
  return (
    <DetailBox>
      <DetailSection>
        <DetailTitle>
          <h2>블루투스</h2>
          <DetailClose
            src={require("../../img/close.png")}
            onClick={() => {
              setShow(false);
            }}
          />
        </DetailTitle>
        <DetailMain>
          <DetailDescription>dfdfdfd</DetailDescription>
          <DetailImg src={require("../../img/back.png")} />
        </DetailMain>
      </DetailSection>
    </DetailBox>
  );
}
