import React, { useState } from "react";
import styled from "styled-components";

type Props = {};

const BlutoothBox = styled.div`
  margin-top: var(--height-header);
`;

export default function Blutooth({}: Props) {
  const [device, setDevice] = useState<object>({});
  async function connectToDevice() {
    await navigator.bluetooth
      .requestDevice({
        filters: [
          {
            name: "HC-06",
          },
        ],
      })
      // acceptAllDevices: true,
      .then((device) => {
        console.log(device);
        // device is a BluetoothDevice object
        setDevice(device);
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors
      });
  }

  function readValue() {}

  function disconnect() {}
  return (
    <BlutoothBox>
      <button onClick={connectToDevice}>Connect to Bluetooth device</button>
      <button onClick={readValue}>Read value</button>
      <button onClick={disconnect}>disconnect</button>
    </BlutoothBox>
  );
}
