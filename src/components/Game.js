import React from "react";
import NumBox from "./NumBox";
import initialData from "../initialValues";
import Confetti from "react-confetti";
import "./game.css";

function Game() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [numObjects, setNumObjects] = React.useState(initialData);
  const [buttonText, setButtonText] = React.useState("Roll");
  const [showConfetti, setShowConfetti] = React.useState(false);

  React.useEffect(() => {
    setNumObjects((prevState) => {
      return prevState.map((obj) => ({
        ...obj,
        value: getRandomInt(0, 9),
      }));
    });
  }, []);

  React.useEffect(() => {
    if (gameFinish() && buttonText === "Reset Game") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
    }
  }, [buttonText]); // Run effect when numObjects changes

  const numBoxElements = numObjects.map((obj) => (
    <NumBox
      key={obj.id}
      id={obj.id}
      value={obj.value}
      change={obj.change}
      handleBoxClick={handleBoxClick}
    />
  ));

  function handleBoxClick(divId) {
    setNumObjects((prevState) =>
      prevState.map((obj) => {
        if (divId === obj.id) {
          return {
            ...obj,
            change: !obj.change,
          };
        } else {
          return obj;
        }
      })
    );

    setButtonText(() => (gameFinish() ? "Reset Game" : "Roll"));
  }

  function handleRollClick() {
    if (buttonText === "Reset Game") {
      setNumObjects((prevState) =>
        prevState.map((obj) => ({
          ...obj,
          value: getRandomInt(0, 9),
          change: true,
        }))
      );
      setButtonText("Roll");
      setShowConfetti(false); // Hide confetti when resetting the game
      return;
    }

    setNumObjects((prevState) =>
      prevState.map((obj) =>
        obj.change ? { ...obj, value: getRandomInt(0, 9) } : obj
      )
    );
  }

  function gameFinish() {
    const temp = numObjects[0].value;
    return numObjects.every((obj) => obj.value === temp);
  }

  return (
    <div className="game">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <h1 className="title">Tenzies</h1>
      <h2 className="description">
        Roll until all dice are the same. Click each dice to freeze it at its
        current value between rolls.
      </h2>
      <div className="boxes-div">{numBoxElements}</div>
      <button className="roll" onClick={handleRollClick}>
        {buttonText}
      </button>
    </div>
  );
}

export default Game;
