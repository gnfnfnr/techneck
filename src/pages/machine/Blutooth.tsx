import React, { useEffect, useState } from "react";
import styled from "styled-components";

type Props = {};

const BlutoothBox = styled.div`
  margin-top: var(--height-header);
`;

export default function Blutooth({}: Props) {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [characteristic, setCharacteristic] = useState<
    BluetoothRemoteGATTCharacteristic | undefined
  >(undefined);
  const [value, setValue] = useState<number | undefined>(undefined);
  const [support, setSupport] = useState<boolean>(true);
  const deviceName = "HC-06";
  const bleService = 0xffe0;
  const bleChar = 0xffe1;
  useEffect(() => {
    if (!navigator.bluetooth) {
      setSupport(false);
    }
  }, []);
  const handleValueChanged = (event: Event) => {
    console.log("dff", event);
    const value = (
      event.target as BluetoothRemoteGATTCharacteristic
    ).value?.getInt8(0);
    console.log(value);
    setValue(value);
  };
  async function connectToDevice() {
    try {
      // Scan for nearby Bluetooth devices
      const options = {
        filters: [{ name: deviceName }],
        optionalServices: [bleService],
      };
      const device = await navigator.bluetooth.requestDevice(options);

      // Connect to the selected device
      const server = await device.gatt?.connect();

      // Get the characteristic for receiving data
      const service = await server?.getPrimaryService(bleService);
      console.log(service);
      const characteristic = await service?.getCharacteristic(bleChar);
      console.log(characteristic?.value?.getInt8(0));
      // const value = await characteristic?.readValue();
      // console.log(value);
      // Start receiving data
      // await characteristic?.startNotifications();
      characteristic?.addEventListener(
        "characteristicvaluechanged",
        handleValueChanged
      );

      // Set the connected device and characteristic in state
      setDevice(device);
      setCharacteristic(characteristic);
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
    console.log(event);
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
