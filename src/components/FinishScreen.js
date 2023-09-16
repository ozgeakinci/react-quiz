import React from "react";

const FinishScreen = ({ points, maxPointsProgress, highScore, dispatch }) => {
  const percentage = (points / maxPointsProgress) * 100;

  let emoji;
  if (percentage === 100) emoji = "🏅";
  if (percentage >= 80 && percentage < 100) emoji = "🤗";
  if (percentage >= 50 && percentage < 80) emoji = "🤔";
  if (percentage >= 0 && percentage < 50) emoji = "😭";
  if (percentage === 0) emoji = "😩";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong> {points} </strong> out of
        <strong> {maxPointsProgress}</strong> ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(HighScore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
