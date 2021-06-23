export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "d475c686f2e94932883cc5a8273bece4";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "streaming",
  "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
  //   console.log(window.location.hash.substring(1));
  //   console.log(window.location.hash.substring(1).split("&"));

  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      //   console.log(initial);
      //   console.log(item);
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
