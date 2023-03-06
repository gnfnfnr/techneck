import React from "react";
import styled from "styled-components";
import Pose from "./Pose";

const WebCamBox = styled.div`
  margin-top: var(--height-header);
`;
type Props = {};

export default function WebCam({}: Props) {
  console.log(window);
  return (
    <WebCamBox>
      주의사항
      <ul>
        <li>1. 얼굴과 어깨가 보여져야 합니다.</li>
        <li>2. 정확하게 측정되지 않을 수도 있습니다</li>
      </ul>
      <div>
        <input type="checkbox" />
        <label>주의 사항을 읽었습니다.</label>
      </div>
      <Pose />
    </WebCamBox>
  );
}
