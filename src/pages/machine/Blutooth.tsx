import React, { useState } from "react";
import styled from "styled-components";

type Props = {};

const BlutoothBox = styled.div`
  margin-top: var(--height-header);
`;

export default function Blutooth({}: Props) {
  const [device, setDevice] = useState<object>({});
  const [support, setSupport] = useState<boolean>(true);
  async function connectToDevice() {
    await navigator.bluetooth
      .requestDevice({
        filters: [
          {
            name: "HC-06",
          },
        ],
        // acceptAllDevices: true,
      })
      .then((device) => {
        console.log(device);
        // device is a BluetoothDevice object
        setDevice(device);
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors
        setSupport(error);
      });
  }

  function readValue() {}

  function disconnect() {}
  return (
    <BlutoothBox>
      {support ? (
        <>
          <button onClick={connectToDevice}>Connect to Bluetooth device</button>
          <button onClick={readValue}>Read value</button>
          <button onClick={disconnect}>disconnect</button>
        </>
      ) : (
        <div>지원되지 않는 환경입니다</div>
      )}
    </BlutoothBox>
  );
}
