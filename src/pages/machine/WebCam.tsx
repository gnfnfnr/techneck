import React, { useEffect, useRef, useState } from "react";
import Pose from "./Pose";
import styled from "styled-components";

const WebCamBox = styled.div`
  margin-top: var(--height-header);
`;
type Props = {};

export default function WebCam({}: Props) {
  return (
    <WebCamBox>
      <div id="label-container"></div>
      <Pose />
    </WebCamBox>
  );
}