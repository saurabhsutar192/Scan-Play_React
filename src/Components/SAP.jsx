import React from "react";
import "../CSS/SAP.css";
import LeftSec from "./LeftSec";
import RightSec from "./RightSec";
import Footer from "./Footer";

export default function SAP() {
  return (
    <div className="sap">
      <LeftSec />
      <RightSec />
      <Footer />
    </div>
  );
}
