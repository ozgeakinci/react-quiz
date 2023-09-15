import React from "react";

const NextQuestion = ({ dispach, answer }) => {
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispach({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
};

export default NextQuestion;
