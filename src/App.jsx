import Webcam from "react-webcam"
import * as tf from "@tensorflow/tfjs"
import * as coco from "@tensorflow-models/coco-ssd"
import './App.css'
import { useState } from "react"
import { useEffect } from "react"

function App() {

  const [modelLoaded, setModelLoaded] = useState()
  const [objectName, setObjectName] = useState("")
  const [objectScore, setObjectScore] = useState("")


  async function loadModel() {
    try {
      const dataset = await coco.load()
      setModelLoaded(dataset)
      console.log('dataset is ready to be loaded')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    tf.ready().then(() => {
      loadModel()
    })
  }, [])



  async function predict() {
    const detection = await modelLoaded.detect(document.getElementById("videoSource"))
    if(detection.length > 0){
      detection.map((result) => {
        setObjectName(result.class)
        setObjectScore(result.score.toFixed(2))
      })
    }
    console.log(detection)
  }

  const videoOption = {
    width: 720,
    height: 480,
    facingMode: "environment"
  }

  console.log(modelLoaded)

  return (
    <div className="App">
      <h1>Simple Object Detection</h1>
      <hr />
      <h3>Object : {objectName ? objectName.toString() : ""}</h3>
      <h3>Accuracy : {objectScore ? objectScore.toString() : ""}</h3>
      <button onClick={() => predict()}>Predict Object</button>
      <hr />
      <Webcam
      id="videoSource"
        // ref={webcam => (this.webcam = webcam)}
        // screenshotFormat="image/jpeg"
        audio={false}
        videoOption={videoOption}
      />
      <hr />
      <p>By <a href="https://msandypr.com">@msandypr</a></p>
    </div>
  );
}

export default App
