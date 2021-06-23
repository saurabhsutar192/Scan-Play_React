import React, { useRef, useEffect } from "react";
import "../CSS/leftSec.css";
import { useDataValue } from "../DataLayer";
import CloseIcon from "@material-ui/icons/Close";

export default function LeftSec() {
  let [{ userPlaylist, id, user }, dispatch] = useDataValue();

  let leftSec = useRef();
  let userName = user?.display_name.split(" ")[0];
  let playlistArr = userPlaylist?.items;
  let removeSec = () => {
    leftSec.current.classList.add("disabled");
  };
  let displayPlaylist = (arrEl) => {
    dispatch({ type: "SET_ID", id: arrEl.id, hasSearched: false });
    leftSec.current.classList.add("disabled");
  };

  useEffect(() => {
    dispatch({ type: "setClassName", value: leftSec.current });
  }, [id]);

  return (
    <div ref={leftSec} className="leftSec disabled">
      <div onClick={removeSec} className="close">
        <CloseIcon fontSize="small" />
      </div>
      <h1 className="logo">Scan & Play</h1>
      <hr className="line" />

      <ul className="listContainer">
        <h2 className="plHead text-start mb-4 mb-sm-2 mb-md-4">
          {userName}'s Playlist
        </h2>
        {playlistArr?.map((arrEl, ind) => {
          let playlist = arrEl?.name;
          return (
            <li
              key={ind}
              onClick={() => {
                displayPlaylist(arrEl);
              }}
              className="py-1 py-md-2 px-3 m-1 my-sm-2"
            >
              {playlist}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
