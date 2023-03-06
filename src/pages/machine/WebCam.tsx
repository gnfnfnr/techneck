import React, { useState } from "react";
import styled from "styled-components";
import Pose from "./Pose";

const WebCamBox = styled.main`
  margin-top: var(--height-header);
  height: calc(100vh - var(--height-header));
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WebCamCover = styled.div`
  width: 60%;
  height: 50%;
  background: #e5ddddb3;
  border-radius: 40px;
  box-shadow: 1px 4px 5px 0px #e87171;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  & p {
    font-size: 20px;
    font-weight: bold;
    padding: 10px 0;
  }
`;
const WebCamBtn = styled.button`
  all: unset;
  background: #e87171;
  padding: 10px 12px;
  border-radius: 12px;
  font-weight: bold;
`;
const WebCamWarning = styled.ul`
  & li {
    padding-bottom: 15px;
  }
`;

const WebCamCheck = styled.div`
  color: #790202;
  font-weight: bold;
  font-size: 15px;
`;

const WebCamDisabled = styled.div`
  color: #747474;
  background: #cdcdcd;
  padding: 10px 12px;
  border-radius: 12px;
  font-weight: bold;
`;

export default function WebCam() {
  const [show, setShow] = useState<boolean>(false);
  return (
    <WebCamBox>
      <WebCamCover>
        <p>주의사항</p>
        <WebCamWarning>
          <li>1. 얼굴과 어깨가 보여져야 합니다.</li>
          <li>2. 정확하게 측정되지 않을 수도 있습니다</li>
          <li></li>
        </WebCamWarning>
        <WebCamCheck>
          <input
            type="checkbox"
            checked={show}
            onChange={() => setShow(!show)}
          />
          <label>주의 사항을 읽었습니다.</label>
        </WebCamCheck>
        {show ? (
          <WebCamBtn
            onClick={() =>
              window.open("/webcam/pose", "width: 400px;", "height: 200px;")
            }
          >
            시작하기
          </WebCamBtn>
        ) : (
          <WebCamDisabled>시작하기</WebCamDisabled>
        )}
      </WebCamCover>
    </WebCamBox>
  );
}
