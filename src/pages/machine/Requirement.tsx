import React, { useEffect, useState } from "react";
import styled from "styled-components";

const RequirementBox = styled.main`
  margin-top: var(--height-header);
  height: calc(100vh - var(--height-header));
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RequirementCover = styled.div`
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
const RequirementBtn = styled.button`
  all: unset;
  background: #e87171;
  padding: 10px 12px;
  border-radius: 12px;
  font-weight: bold;
`;
const RequirementWarning = styled.ul`
  & li {
    padding-bottom: 15px;
  }
`;

const RequirementCheck = styled.div`
  color: #790202;
  font-weight: bold;
  font-size: 15px;
`;

const RequirementDisabled = styled.div`
  color: #747474;
  background: #cdcdcd;
  padding: 10px 12px;
  border-radius: 12px;
  font-weight: bold;
`;

export default function Requirement() {
  const [show, setShow] = useState<boolean>(false);
  const [isDevice, setIsDevice] = useState<boolean>(false);

  return (
    <RequirementBox>
      <RequirementCover>
        <p>주의사항</p>
        <RequirementWarning>
          <li>1. 얼굴과 어깨가 보여져야 합니다.</li>
          <li>2. 정확하게 측정되지 않을 수도 있습니다</li>
        </RequirementWarning>
        <RequirementCheck>
          <input
            type="checkbox"
            checked={show}
            onChange={() => setShow(!show)}
            id="warning"
          />
          <label htmlFor="warning">주의 사항을 읽었습니다.</label>
        </RequirementCheck>
        <RequirementCheck>
          <input
            type="checkbox"
            checked={isDevice}
            onChange={() => setIsDevice(!isDevice)}
            id="link"
          />
          <label htmlFor="link">거북목 교정기를 가지고 있습니다</label>
        </RequirementCheck>
        {show ? (
          <RequirementBtn
            onClick={() =>
              window.open(
                `/pose?device=${isDevice ? 1 : 2}`,
                "_blank",
                "width: 300px, height: 200px"
              )
            }
          >
            시작하기
          </RequirementBtn>
        ) : (
          <RequirementDisabled>시작하기</RequirementDisabled>
        )}
      </RequirementCover>
    </RequirementBox>
  );
}
