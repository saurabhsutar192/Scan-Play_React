import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Landing from "./Components/Landing";
import SAP from "./Components/SAP";
import "./CSS/app.css";
import { getTokenFromUrl } from "./spotify";
import { useDataValue } from "./DataLayer";

let spotify = new SpotifyWebApi();

function App() {
  // console.log(spotify);
  let [{ token, id }, dispatch] = useDataValue();

  useEffect(() => {
    let tokenVar = getTokenFromUrl().access_token;
    window.location.hash = "";

    dispatch({ type: "setSpotify", spotify: spotify });

    if (tokenVar) {
      //waits for tokenVar if not used error
      dispatch({
        type: "SET_TOKEN",
        token: tokenVar,
      });
      spotify.setAccessToken(tokenVar);
      console.log("useEffect tokenVar Triggered");
      spotify
        .getMe()
        .then((user) => {
          dispatch({
            type: "SET_USER",
            user,
          });
        })
        .catch((err) => {
          console.log(err);
        });

      spotify
        .getUserPlaylists()
        .then((res) => {
          dispatch({ type: "SET_userPLAYLIST", userPlaylist: res });
        })
        .catch((error) => console.log(error));
    }
  }, [token]);

  // console.log(token);
  return <div className="app">{token ? <SAP /> : <Landing />}</div>;
}

export default App;
