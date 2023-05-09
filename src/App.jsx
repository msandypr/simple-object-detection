import Webcam from "react-webcam"
import * as tf from "@tensorflow/tfjs"
import * as model from "@tensorflow-models/coco-ssd"
import './App.css'

function App() {
  
  const videoOption = {
    width: 720,
    height: 480,
    facingMode: "environment"
  }

  return(
    <div className="App">
      <h1>Simple Object Detection</h1>
      <p>By <a href="https://msandypr.com">@msandypr</a></p>
      <Webcam
        // ref={webcam => (this.webcam = webcam)}
        // screenshotFormat="image/jpeg"
        audio={false}
        videoOption={videoOption}
      />

    </div>
  );
}

export default App
