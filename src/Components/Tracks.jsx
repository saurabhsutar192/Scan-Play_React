import React, { useEffect, useState, useRef } from "react";
import "../CSS/tracks.css";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
// import ShuffleIcon from "@material-ui/icons/Shuffle";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { useDataValue } from "../DataLayer";

// import "../face-api.min.js";
import Scanner from "../Scanner";

export default function TrackContainer() {
  let [
    { playlists, spotify, id, hasSearched, searchList, token, scan },
    dispatch,
  ] = useDataValue();

  let [deviceIds, setIde] = useState([]);
  // let [scanner, setScanner] = useState(false);

  function addTrackHover(e) {
    let track = e.currentTarget.childNodes[1];

    track.classList.toggle("trackHover");
  }

  function playPlaylist() {
    console.log(deviceIds);
    if (deviceIds) {
      spotify
        .transferMyPlayback(deviceIds) //array Required
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));

      spotify
        .play({
          context_uri: `spotify:playlist:${id}`,
        })
        .then((result) => {
          console.log(result);
          spotify
            .getMyCurrentPlaybackState()
            .then((res) => {
              dispatch({ type: "setPlaying", playing: true });
              dispatch({ type: "SET_ITEM", item: res.item });
              dispatch({ type: "set indSong", indSong: false });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }

  function playSong(arrEl) {
    let songId = "";
    if (!hasSearched) {
      songId = arrEl?.track?.id;
    } else {
      songId = arrEl?.id;
    }
    spotify
      .play({
        uris: [`spotify:track:${songId}`],
      })
      .then((res) => {
        spotify
          .getMyCurrentPlaybackState()
          .then((res) => {
            dispatch({ type: "setPlaying", playing: true });
            dispatch({ type: "SET_ITEM", item: res.item });
            dispatch({ type: "set indSong", indSong: true });
          })
          .catch((err) => console.log(err));
      });
  }

  function startScan() {
    console.log("Scanning");
    dispatch({ type: "setScan", scan: true });
    // setScanner(true);
  }

  function TrackContent({ arrEl, ind, type }) {
    let trackImg = "";
    let trackArtist = "";
    let trackName = "";

    if (type === "tracks") {
      trackImg = arrEl.track.album.images[0].url;
      // console.log(trackImg);

      trackName = arrEl.track.name;
      // console.log(arrEl.track);

      trackArtist = arrEl.track.album.artists
        .map((artist) => artist.name)
        .join(", ");
      // console.log(trackArtist);
    } else {
      trackImg = arrEl.album.images[0].url;
      // console.log(trackImg);

      trackName = arrEl.name;
      // console.log(trackName);

      trackArtist = arrEl.artists.map((artist) => artist.name).join(", ");
    }
    return (
      <div
        onClick={() => playSong(arrEl)}
        key={ind}
        className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 col-xxl-2 "
      >
        <div
          onMouseEnter={addTrackHover}
          onMouseLeave={addTrackHover}
          className="track text-center"
        >
          <img className="trackImg" src={trackImg} alt="" />
          <div className="trackDesc pb-2">
            <h3 className="trackName m-0 px-3">{trackName}</h3>
            <p className="trackArtist mb-3 text-center px-5 pt-1">
              {trackArtist}
            </p>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    // console.log(id);
    spotify
      .getPlaylist(id)
      .then((playlist) => {
        dispatch({ type: "SET_PLAYLISTS", playlists: playlist.tracks?.items });
      })
      .catch((err) => {
        console.log(err);
      });
    spotify.getMyDevices().then((res) => {
      return setIde((arr) => [res?.devices[0]?.id]);
    });
  }, [id]);

  return (
    <div className="tracks row g-2 g-sm-3 g-md-3 g-lg-4 m-0">
      {
        <div className="subHeader d-flex mb-2 mt-0 mt-sm-2 mb-sm-3">
          {!hasSearched && (
            <div
              onClick={playPlaylist}
              className="playAll ms-1 me-2 ms-sm-3 me-sm-4"
            >
              <PlayCircleFilledWhiteIcon fontSize="large" />
            </div>
          )}
          <div onClick={startScan} className="shuffle ms-sm-2">
            <CameraAltIcon fontSize="large" />
          </div>
        </div>
      }
      {/* {console.log(searchedTracks)}
      {console.log(tracks)} */}
      {!hasSearched
        ? playlists?.map((arrEl, ind) => {
            return (
              <TrackContent key={ind} arrEl={arrEl} ind={ind} type="tracks" />
            );
          })
        : searchList?.map((arrEl, ind) => {
            return (
              <TrackContent key={ind} arrEl={arrEl} ind={ind} type="searched" />
            );
          })}
      {scan && <Scanner />}
    </div>
  );
}
