import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import UseInterval from "../components/UseInterval";
import BluetoothDeivce from "./BluetoothDeivce";
import { notify } from "../components/Notify";
import Webcam from "./Webcam";

export default function Pose() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [poseRate, setPoseRate] = useState<number>(0);
  const [deviceRate, setDeviceRate] = useState<number>(0);
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  UseInterval(() => {
    if (deviceRate !== 0 || poseRate > 0.5) {
      notify();
    }
  }, 10000);
  const show = searchParams.get("device");

  return (
    <div>
      {show === "1" ? (
        <>
          <BluetoothDeivce
            setDeviceRate={setDeviceRate}
            device={device}
            setDevice={setDevice}
          />
          {device && <Webcam setPoseRate={setPoseRate} />}
        </>
      ) : (
        <Webcam setPoseRate={setPoseRate} />
      )}
    </div>
  );
}
