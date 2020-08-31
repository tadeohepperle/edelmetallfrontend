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
  </>
);
