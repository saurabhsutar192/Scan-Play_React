import React from "react";
import "../CSS/landing.css";
import { loginUrl } from "../spotify";

export default function Landing() {
  return (
    <div className="vh-100 vw-100 container-fluid d-flex justify-content-center align-items-center ">
      <div className="h-100 landing w-75 row d-flex flex-row justify-content-center ">
        <div className="lDiv w-50 h-100 col-md-6 d-flex flex-column justify-content-center align-items-center ">
          <div className="sapText text-center">Scan & Play</div>
          <div className="desc text-center mb-4">
            A face to dive in your personal space
          </div>
          <a href={loginUrl}>
            <button className=" loginBtn btn mt-5 p-2 px-4">
              Login->Spotify
            </button>
          </a>
        </div>
        <div className="rDiv w-50 h-100 col-md-6  d-flex justify-content-center align-items-center ">
          <img className="hpImg w-100" src="imgs/vector.svg"></img>
        </div>
      </div>
    </div>
  );
}
