import React, { useRef } from "react";
import "../CSS/header.css";
import MenuIcon from "@material-ui/icons/Menu";
import { useDataValue } from "../DataLayer";

export default function Header() {
  let menuIcon = useRef();
  let searchResult = useRef();

  let [{ HTMLelement, user, spotify }, dispatch] = useDataValue();

  let menuToggle = () => {
    HTMLelement.classList.toggle("disabled");
  };
  let userName = user?.display_name.split(" ")[0];
  let userImg = user?.images[0].url;

  function searchTracks(e) {
    if (e.keyCode === 13) {
      // dispatch({ type: "setSearch", hasSearched: true });
      // console.log(searchResult.current.value);
      spotify
        .search(searchResult.current.value, ["track", "playlist"], {
          limit: 20,
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
  }
  // console.log(user);

  return (
    <div className="header">
      <div onClick={menuToggle} ref={menuIcon} className="menuIcon">
        {<MenuIcon fontSize="large" />}
      </div>

      <input
        ref={searchResult}
        onKeyDown={searchTracks}
        className="search"
        type="text"
        placeholder="Search"
      />

      <div className="userInfo">
        <div className="userName ">{userName}</div>
        <div className="userImg">
          <img src={userImg} alt="x" />
        </div>
      </div>
    </div>
  );
}
