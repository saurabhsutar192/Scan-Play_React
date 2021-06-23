import React, { useState, useEffect } from "react";
import "../CSS/footer.css";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseIcon from "@material-ui/icons/Pause";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { useDataValue } from "../DataLayer.js";

export default function Footer() {
  // let [pp, setPp] = useState(true);
  // let [currTrackName, setCurrTrackName] = useState();
  // let [currTrackImg, setCurrTrackImg] = useState();
  // let [currTrackArtist, setCurrTrackArtist] = useState();
  // let [fVal, setFVal] = useState(false);

  let [{ spotify, playing, item, indSong }, dispatch] = useDataValue();

  function controlVolume(event) {
    // console.log(event.target.value);
  }

  function play() {
    spotify.play().then(() => {
      spotify.getMyCurrentPlaybackState().then((res) => {
        dispatch({ type: "setPlaying", playing: true });
        // dispatch({ type: "SET_ITEM", item: res?.item });
      });
    });

    // updateFooter();
  }

  function Pause() {
    spotify.pause().then(() => {
      spotify.getMyCurrentPlaybackState().then((res) => {
        dispatch({ type: "setPlaying", playing: false });
        // dispatch({ type: "SET_ITEM", item: res?.item });
      });
    });
    // updateFooter();
  }

  function next() {
    console.log(indSong);
    spotify.skipToNext().then((res) => {
      spotify.getMyCurrentPlaybackState().then((res) => {
        console.log(res);
        dispatch({ type: "setPlaying", playing: indSong ? false : true });
        dispatch({ type: "SET_ITEM", item: res?.item });
      });
    });
    // updateFooter();
  }
  function prev() {
    spotify.skipToPrevious().then(() => {
      spotify.getMyCurrentPlaybackState().then((res) => {
        dispatch({ type: "setPlaying", playing: indSong ? false : true });
        dispatch({ type: "SET_ITEM", item: res?.item });
      });
    });
    // updateFooter();
  }

  return (
    <div className="footer">
      <div className="currTrack d-flex p-2">
        <div className="currTrackImg">
          <img src={item?.album?.images[0]?.url} alt="" />
        </div>
        <div className="currTrackDesc px-2">
          <h2 className="currTrackTitle ">{item?.name}</h2>
          <p className="currTrackArtist mb-0">
            {item?.artists?.map((arr) => arr.name).join(",")}
          </p>
        </div>
      </div>
      <div className="playControls mt-2">
        <div className="icons">
          <div onClick={prev} className="back">
            <NavigateBeforeIcon />
          </div>
          {!playing ? (
            <div onClick={play} className="play mx-sm-4">
              <PlayCircleFilledIcon fontSize="large" />
            </div>
          ) : (
            <div onClick={Pause} className="pause mx-sm-4 ">
              <PauseIcon fontSize="large" />
            </div>
          )}

          <div onClick={next} className="next">
            <NavigateNextIcon />
          </div>
        </div>
        <div className="sliderContainer mt-md-2 px-3 px-lg-4 px-md-3">
          <input type="range" class="slider "></input>
        </div>
      </div>
      <div className="volumeControl p-2 px-md-5 goAway">
        <div className="volumeIcon mx-sm-2">
          <VolumeUpIcon fontSize="large" />
        </div>
        <div className="volumeSlider">
          <input
            onChange={controlVolume}
            type="range"
            className="mt-2 px-2 w-100"
            min={0}
            max={100}
          />
        </div>
      </div>
    </div>
  );
}
