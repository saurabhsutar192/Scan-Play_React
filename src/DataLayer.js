import React, { useReducer, createContext, useContext } from "react";

let DataProvider = createContext();

let initVal = {
  HTMLelement: null,
  user: null,
  token: null,
  userPlaylist: [],
  playlists: [],
  playing: false,
  item: null,
  id: "37i9dQZF1DXakNm38Tvblu",
  spotify: null,
  hasSearched: false,
  searchList: [],
  indSong: false,
  scan: false,
  expression: null,
};
let reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };
    case "setSpotify":
      return {
        ...state,
        spotify: action.spotify,
      };
    case "SET_ID":
      return {
        ...state,
        id: action.id,
        hasSearched: action.hasSearched,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_userPLAYLIST":
      return {
        ...state,
        userPlaylist: action.userPlaylist,
      };
    case "setClassName":
      return {
        ...state,
        HTMLelement: action.value,
      };
    case "setScan":
      return {
        ...state,
        scan: action.scan,
      };
    case "setExpression":
      return {
        ...state,
        expression: action.expression,
      };

    case "setSearchList":
      return {
        ...state,
        searchList: action.searchList,
        hasSearched: action.hasSearched,
      };
    case "setPlaying":
      return {
        ...state,
        playing: action.playing,
      };
    case "set indSong":
      return {
        ...state,
        indSong: action.indSong,
      };
    default:
      return state;
  }
};

export default function DataLayer(prop) {
  return (
    <DataProvider.Provider value={useReducer(reducer, initVal)}>
      {prop.children}
    </DataProvider.Provider>
  );
}

export { DataProvider };

export const useDataValue = () => useContext(DataProvider);
