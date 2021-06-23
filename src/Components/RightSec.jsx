import React from "react";
import "../CSS/rightSec.css";
import Header from "./Header";
import TrackContainer from "./Tracks";
export default function RightSec() {
  return (
    <div className="rightSec">
      <Header />
      <TrackContainer />
      {/* <div className="discoverNow">discover</div>
      <div className="tracks">tracks</div> */}
    </div>
  );
}
