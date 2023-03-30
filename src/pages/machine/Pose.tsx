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
  const [poseResult, setPoseResult] = useState<string>("");
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  UseInterval(() => {
    setPoseResult(
      poseRate > 0.5 || deviceRate !== 0 ? "거북목 입니다" : "바른자세 입니다"
    );
  }, 10000);
  useEffect(() => {
    notify();
  }, [poseResult]);
  return (
    <div>
      {device && <Webcam setPoseRate={setPoseRate} />}
      {searchParams.get("device") && (
        <BluetoothDeivce
          setDeviceRate={setDeviceRate}
          device={device}
          setDevice={setDevice}
        />
      )}
    </div>
  );
}
