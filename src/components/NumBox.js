import React from "react";
import "./numBox.css";

function NumBox(props) {
  return (
    <div
      className={`${props.change ? "numBox" : "numBoxSelected"}`}
      onClick={() => {
        props.handleBoxClick(props.id);
      }}
    >
      <h1 className="boxNumber">{props.value}</h1>
    </div>
  );
}

export default NumBox;
