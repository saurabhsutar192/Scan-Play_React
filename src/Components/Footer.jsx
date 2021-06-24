import React, { useState, useEffect, useRef } from "react";
import "../CSS/footer.css";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseIcon from "@material-ui/icons/Pause";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { useDataValue } from "../DataLayer.js";

export default function Footer() {
  let [{ spotify, playing, item, indSong }, dispatch] = useDataValue();
  let [range, setRange] = useState(0);

  let seekbar = useRef();

  let volumeBar = useRef();
  function controlVolume(event) {
    let volume = event.target.value;
    spotify
      .setVolume(volume)

      .catch((err) => {
        console.log(err);
      });
  }

  function play() {
    spotify.play().then(() => {
      spotify.getMyCurrentPlaybackState().then((res) => {
        resetSeek(res);
        let duration = Math.floor(res?.item?.duration_ms / 1000);
        dispatch({ type: "setPlaying", playing: true });
        autoSeek(duration);
      });
    });
  }

  function Pause() {
    spotify.pause().then(() => {
      spotify.getMyCurrentPlaybackState().then((res) => {
        resetSeek(res);
        console.log(window.seekTimer);
        clearInterval(window.seekTimer);
        dispatch({ type: "setPlaying", playing: false });
      });
    });
  }

  function next() {
    console.log(indSong);
    spotify.skipToNext().then((res) => {
      spotify.getMyCurrentPlaybackState().then((res) => {
        resetSeek(res);
        dispatch({ type: "setPlaying", playing: indSong ? false : true });
        let duration = Math.floor(res?.item?.duration_ms / 1000);
        // playing ? autoSeek(duration) : clearInterval(window.seekTimer);
        dispatch({ type: "SET_ITEM", item: res?.item });
      });
    });
  }
  function prev() {
    spotify.skipToPrevious().then(() => {
      spotify.getMyCurrentPlaybackState().then((res) => {
        dispatch({ type: "setPlaying", playing: indSong ? false : true });
        let duration = Math.floor(res?.item?.duration_ms / 1000);
        // playing ? autoSeek(duration) : clearInterval(window.seekTimer);
        dispatch({ type: "SET_ITEM", item: res?.item });
      });
    });
  }
  function userSeek(e) {
    console.log(e.target.value);
    let duration = "";
    let position = e.target.value;
    setRange(position);
    spotify.getMyCurrentPlaybackState().then((res) => {
      duration = res.item.duration_ms;
      if (duration !== 0) {
        let timeStamp = Math.floor(duration * (position / 100));
        spotify.seek(timeStamp).catch((error) => console.log(error));
      }
    });
  }

  function autoSeek(duration) {
    window.seekTimer = setInterval(() => {
      seekbar.current.value = parseInt(seekbar.current.value) + 1;
      console.log(parseInt(seekbar.current.value) + 1);
      setRange(seekbar.current.value);
    }, duration * 10);
  }

  function resetSeek(res) {
    let currDuration = res?.item?.duration_ms;
    let currProgress = res?.progress_ms;
    seekbar.current.value = (currProgress * 100) / currDuration;
  }

  // useEffect(() => {
  //   spotify.getMyCurrentPlaybackState().then((res) => {
  //     if (res?.context?.type !== "playlist") {
  //       dispatch({ type: "set indSong", indSong: true });
  //     }
  //   });
  // }, []);

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((res) => {
      resetSeek(res);
      let duration = Math.floor(res?.item?.duration_ms / 1000);
      // console.log(playing);
      // playing ? autoSeek(duration) : clearInterval(window.seekTimer); //buggy
      volumeBar.current.value = res?.device?.volume_percent;
      dispatch({ type: "setPlaying", playing: res?.is_playing });
    });
  }, [playing]);

  useEffect(() => {
    if (seekbar.current.value >= 100) {
      clearInterval(window.seekTimer);
      seekbar.current.value = 0;
      dispatch({ type: "setPlaying", playing: indSong ? false : true });
    }
  }, [range]);

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
          <input
            onClick={userSeek}
            ref={seekbar}
            defaultValue={0}
            min={0}
            max={100}
            type="range"
            class="slider "
          ></input>
        </div>
      </div>
      <div className="volumeControl p-2 px-md-5 goAway">
        <div className="volumeIcon mx-sm-2">
          <VolumeUpIcon fontSize="large" />
        </div>
        <div className="volumeSlider">
          <input
            onChange={controlVolume}
            defaultValue={100}
            ref={volumeBar}
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
