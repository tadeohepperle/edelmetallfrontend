import React from "react";
import Calculator from "./Calculator";

export default () => (
  <>
    <div
      className="jumbotron"
      style={{
        background: "linear-gradient(to bottom right, #de8b04, #ffde4a)",
      }}
    >
      <div className="container" style={{ color: "white" }}>
        <h1 className="display-4" style={{ fontWeight: "bold" }}>
          Edelmetall-Rendite
        </h1>
        <p className="lead my-4" style={{ fontWeight: "bold" }}>
          Was wäre aus deinen Edelmetallinvestments geworden wenn du am Tag X
          investiert hättest?
        </p>
      </div>
    </div>
    <div className="container">
      <Calculator></Calculator>
    </div>
    <div className="jumbotron" style={{ margin: "6em 0em 0em" }}>
      <div className="container">
        <p className="lead my-4">
          Eine Web-Application von Tadeo Hepperle und Henrik Mader | 31.08.2020
        </p>
        <p className="lead my-4">
          Funktioniert für Daten zwischen dem 01.01.2000 und dem 25.08.2020
        </p>
      </div>
    </div>
  </>
);
