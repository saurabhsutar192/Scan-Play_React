import React, { useRef, useEffect, useState } from "react";
import { useDataValue } from "./DataLayer";
import * as faceapi from "face-api.js";

// import * as faceapi from "./face-api.min.js";

import CloseIcon from "@material-ui/icons/Close";
// const faceapi = require("")
// const video = document.getElementById("video");

export default function Scanner() {
  let [{ scan, spotify }, dispatch] = useDataValue();
  let scanContainer = useRef();
  let videoEL = useRef();
  let [video, setVideo] = useState();
  let localStream = "";

  useEffect(() => {
    setVideo(videoEL.current);
    // console.log(video);
  }, []);

  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("models"),
    faceapi.nets.faceExpressionNet.loadFromUri("models"),
  ])
    .then(startVideo)
    .catch((error) => console.error(error));
  // console.log(video);

  function startVideo() {
    if (video) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
        localStream = stream;
      });

      // (err) => console.error(err)
    }
  }

  function detect() {
    let neutral = "";
    let angry = "";
    let fearful = "";
    let sad = "";
    let disgusted = "";
    let surprised = "";
    let happy = "";

    let mainExp = "";

    const canvas = faceapi.createCanvasFromMedia(video);
    scanContainer.current.append(canvas);

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    let interval = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas?.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      // let expression = detections;
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      // console.log(detections[0]?.expressions);
      neutral = detections[0]?.expressions.neutral;
      angry = detections[0]?.expressions.angry;
      fearful = detections[0]?.expressions.fearful;
      sad = detections[0]?.expressions.sad;
      disgusted = detections[0]?.expressions.disgusted;
      surprised = detections[0]?.expressions.surprised;
      happy = detections[0]?.expressions.happy;

      // console.log(happy);
      setTimeout(() => {
        if (happy > 0.7) {
          mainExp = "a r rahman";
          dispatch({ type: "setScan", scan: false });
          clearInterval(interval);

          // console.log(mainExp);
        } else if (sad > 0.7) {
          mainExp = "arijit";
          dispatch({ type: "setScan", scan: false });
          clearInterval(interval);
          // console.log(mainExp);
        } else if (disgusted > 0.7) {
          mainExp = "atif aslam";
          dispatch({ type: "setScan", scan: false });
          clearInterval(interval);
          // console.log(mainExp);
        } else if (surprised > 0.7) {
          mainExp = "ajay atul";
          dispatch({ type: "setScan", scan: false });
          clearInterval(interval);
          // console.log(mainExp);
        } else if (angry > 0.7) {
          mainExp = "amit trivedi";
          dispatch({ type: "setScan", scan: false });
          clearInterval(interval);
          // console.log(mainExp);
        } else if (neutral > 0.7) {
          mainExp = "kk";
          dispatch({ type: "setScan", scan: false });
          clearInterval(interval);
          // console.log(mainExp);
        } else if (fearful > 0.7) {
          mainExp = "sonu nigam";
          dispatch({ type: "setScan", scan: false });
          clearInterval(interval);
          // console.log(mainExp);
        } else {
          mainExp = "undefined";
        }
        if (mainExp !== "undefined" && mainExp !== "") {
          console.log(mainExp);

          localStream?.getVideoTracks()[0].stop();
          video.src = "";
          spotify
            .search(mainExp, ["track", "playlist"], {
              limit: 30,
              offset: 1,
            })
            .then((res) => {
              dispatch({
                type: "setSearchList",
                searchList: res.tracks?.items,
                hasSearched: true,
              });
            });
        }
      }, 2000);
    }, 100);
    // setTimeout(() => {
    //   dispatch({ type: "setScan", scan: false });

    //   clearInterval(interval);

    // }, [10000]);
  }

  return (
    <div ref={scanContainer} className="scanner m-0 p-0">
      <div
        onClick={() => {
          dispatch({ type: "setScan", scan: false });
          localStream?.getVideoTracks()[0].stop();
          video.src = "";
        }}
        className="closeScan "
      >
        <CloseIcon fontSize="large" />
      </div>
      <video
        onPlay={detect}
        ref={videoEL}
        id="video"
        width="720"
        height="560"
        autoPlay
        muted
      ></video>
    </div>
  );
}
