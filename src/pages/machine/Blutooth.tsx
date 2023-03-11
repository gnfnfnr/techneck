import React, { useEffect, useState } from "react";
import styled from "styled-components";

type Props = {};

const BlutoothBox = styled.div`
  margin-top: var(--height-header);
`;

export default function Blutooth({}: Props) {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [support, setSupport] = useState<boolean>(true);
  const deviceName = "HC-06";
  const bleService = "fitness_machine";
  const bleCharacteristic = "battery_level";
  useEffect(() => {
    if (!navigator.bluetooth) {
      setSupport(false);
    }
  }, []);
  async function connectToDevice() {
    try {
      const options = {
        filters: [
          {
            name: deviceName,
          },
        ],
        optionalServices: [bleService],
        // acceptAllDevices: true,
      };
      const devi = await navigator.bluetooth.requestDevice(options);
      setDevice(devi);
    } catch (error) {
      console.error("Error connecting to Bluetooth device:", error);
    }
  }

  async function readValue() {
    if (device) {
      console.log(device);
      const infoCharacteristics = await device.gatt
        ?.connect()
        .then((server) => {
          return server.getPrimaryService(bleService);
        })
        .then((service) => {
          return service.getCharacteristics();
        });
      infoCharacteristics?.forEach(async (characteristic, index, array) => {
        // Returns a buffer
        console.log(characteristic);
        const value = await characteristic.readValue();
        console.log(value.getUint8(0));
        // characteristic.addEventListener(
        //   "characteristicvaluechanged",
        //   handleBatteryLevelChanged
        // );
      });
    } else {
      console.log("연결된 블루투스가 없습니다");
    }
  }
  function handleBatteryLevelChanged(event: any) {
    if (event.target.value) {
      let measure = event.target.value.getUint8(0);
      console.log(measure);
    } else {
      console.log("rkqt ");
    }
  }
  async function disconnect() {
    try {
      // Disconnect from the connected device
      await device?.gatt?.disconnect();
      // Clear the connected device from state
      setDevice(null);
    } catch (error) {
      console.error("Error disconnecting from Bluetooth device:", error);
    }
  }
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
