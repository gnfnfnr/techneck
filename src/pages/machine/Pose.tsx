import React, { useRef } from "react";
import * as tmPose from "@teachablemachine/pose";

type Props = {};

const Pose = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const URL: string =
    "https://teachablemachine.withgoogle.com/models/R1Rlcg33R/";
  let model: any,
    webcam: tmPose.Webcam,
    ctx: CanvasRenderingContext2D,
    maxPredictions: number;
  async function init(): Promise<void> {
    const modelURL: string = URL + "model.json";
    const metadataURL: string = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size: number = 200;
    const flip: boolean = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    if (canvasRef.current) {
      canvasRef.current.width = size;
      canvasRef.current.height = size;
      ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
      for (let i: number = 0; i < maxPredictions; i++) {
        // and class labels

        containerRef.current &&
          containerRef.current.appendChild(document.createElement("div"));
      }
    }
  }

  async function loop(timestamp: number): Promise<void> {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict(): Promise<void> {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    console.log(model);
    const { pose, posenetOutput } = await model.estimatePose(
      webcam.canvas,
      false
    );

    // // Prediction 2: run input through teachable machine classification model
    // const prediction = await model.predict(posenetOutput);
    // for (let i: number = 0; i < maxPredictions; i++) {
    //   const classPrediction: string =
    //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //   if (containerRef.current) {
    //     containerRef.current.innerHTML = classPrediction;
    //   }
    // }
    // finally draw the poses
    // drawPose(pose);
  }

  function drawPose(pose: any | undefined): void {
    console.log(webcam);
    if (webcam.canvas) {
      console.log(webcam.canvas);
      ctx.drawImage(webcam.canvas, 0, 0);
      // draw the keypoints and skeleton
      if (pose) {
        const minPartConfidence: number = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    } else {
      console.log("dff");
    }
  }

  return (
    <>
      <div onClick={init}>시작하기</div>;
      <div>
        <canvas ref={canvasRef} width="200px" height="300px"></canvas>
      </div>
      <div ref={containerRef}></div>
    </>
  );
};
export default Pose;
