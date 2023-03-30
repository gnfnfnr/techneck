import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

const BlutoothBox = styled.div`
  margin-top: var(--height-header);
`;

interface Info {
  setDeviceRate: Dispatch<SetStateAction<number>>;
  device: BluetoothDevice | null;
  setDevice: Dispatch<SetStateAction<BluetoothDevice | null>>;
}

export default function BluetoothDeivce({
  setDeviceRate,
  device,
  setDevice,
}: Info) {
  const [support, setSupport] = useState<boolean>(false);
  // const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [text, setText] = useState<String>("블루투스를 연결해주세요");
  const deviceName = "HC-06";
  useEffect(() => {
    if (navigator.bluetooth) {
      setSupport(true);
    }
  }, []);
  useEffect(() => {
    if (device?.name) {
      setText(device?.name);
    }
  }, [device]);
  async function connect() {
    try {
      const options = {
        filters: [{ name: deviceName }],
      };
      const device = await navigator.bluetooth.requestDevice(options);
      setDevice(device);
      if (device) {
        const server = await device.gatt?.connect();

        // Get the characteristic for receiving data
        const service = await server?.getPrimaryService(serviceUuid);
        const characteristic = await service?.getCharacteristic(
          characteristicUuid
        );
        console.log(characteristic?.value?.getInt8(0));
        characteristic?.addEventListener(
          "characteristicvaluechanged",
          handleNotifications
        );
      }
    } catch {
      setText("오류가 발생했습니다. 블루투스 연결을 다시 시도해주세요");
    }
  }

  function disconnect() {
    try {
      device?.gatt?.disconnect();
      setDevice(null);
      setText("블루투스가 해지되었습니다.");
    } catch (error) {
      setText("블루투스 연결 해제 중 오류가 발생했습니다.");
    }
  }

  const serviceUuid = 0xffe0;
  const characteristicUuid = 0xffe1;

  function handleNotifications(event: Event) {
    let value: any = (
      event.target as BluetoothRemoteGATTCharacteristic
    ).value?.getInt8(0);
    let a = [];
    setDeviceRate(value);
  }
  return (
    <BlutoothBox>
      {support ? (
        <div>
          <button onClick={connect}>블루투스 연결</button>
          <button onClick={disconnect}>블루투스 해지</button>
          <p>{text}</p>
        </div>
      ) : (
        <div>블루투스를 지원하지 않습니다</div>
      )}
    </BlutoothBox>
  );
}
