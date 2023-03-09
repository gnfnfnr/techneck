import React, { useEffect, useRef, useState } from "react";

const Pose = () => {
  const [prediction, setPrediction] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<number[]>([0, 0]);
  const containerRef = useRef<null[] | HTMLDivElement[]>([]);
  const tmPose: any = window.tmPose;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const URL: string =
    "https://teachablemachine.withgoogle.com/models/R1Rlcg33R/";
  let model: any,
    webcam: any,
    ctx: CanvasRenderingContext2D,
    maxPredictions: number;

  useEffect(() => {
    init();
    window.resizeTo(window.innerWidth / 2, (window.innerHeight / 3) * 2);
  }, []);
  async function init(): Promise<void> {
    const modelURL: string = URL + "model.json";
    const metadataURL: string = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const widthSize: number = window.innerWidth;
    const heightSize: number = (window.innerHeight / 3) * 2;
    const flip: boolean = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(widthSize, heightSize, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    if (canvasRef.current) {
      canvasRef.current.width = widthSize;
      canvasRef.current.height = heightSize;
      ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
      setPrediction(maxPredictions);
    }
  }

  async function loop(): Promise<void> {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  // Prediction 2: run input through teachable machine classification model
  async function predict(): Promise<void> {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      elementControl(containerRef.current[i], classPrediction);
    }

    // finally draw the poses
    drawPose(pose);
  }

  function elementControl(ele: HTMLElement | null, value: string) {
    if (ele) {
      ele.innerHTML = value;
    }
  }

  function drawPose(pose: any | undefined): void {
    if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);
      // draw the keypoints and skeleton
      if (pose) {
        const minPartConfidence: number = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  }

  return (
    <>
      <div>
        <canvas ref={canvasRef} />
      </div>
      <div>
        {Array.from({ length: prediction }, (_, index: number) => index).map(
          (index) => (
            <div
              ref={(ele: HTMLDivElement) => (containerRef.current[index] = ele)}
            />
          )
        )}
      </div>
    </>
  );
};
export default Pose;
