import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import BluetoothDeivce from "./BluetoothDeivce";
import Webcam from "./Webcam";

export default function Pose() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [poseRate, setPoseRate] = useState<number>(0);
  const [deviceRate, setDeviceRate] = useState<number>(0);
  console.log(poseRate + deviceRate);
  return (
    <div>
      <Webcam setPoseRate={setPoseRate} />
      {searchParams.get("device") && (
        <BluetoothDeivce setDeviceRate={setDeviceRate} />
      )}
    </div>
  );
}
