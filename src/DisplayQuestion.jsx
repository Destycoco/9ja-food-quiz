import Option from "./Option";
import Button from "./Button";
import { useEffect } from "react";
import Timer from "./Timer";
function DisplayQuestion({
  questions,
  index,
  dispatch,
  points,
  selectedOptions,
  level,
  maxPoints,
  choice,
  maxTime,
}) {
  useEffect(() => {
    const timerInterval = setInterval(() => dispatch({ type: "timer" }), 1000);
    // Clear the interval when the component is unmounted
    return () => clearInterval(timerInterval);
  }, [dispatch]);
  // const maxPoints = questions.reduce((acc, cur) => acc + cur.point, 0);
  function handleNext() {
    dispatch({ type: "nextQuestion" });
  }
  function handleFinish() {
    dispatch({ type: "finish" });
  }

  const gameEnded = selectedOptions.length === questions.length;
  return (
    <div className="display-questions">
      <div className="questions-sec">
        <h1>
          Level:{" "}
          {level === "easy"
            ? "EASY"
            : level === "medium"
            ? "MEDIUM"
            : level === "hard"
            ? "HARD"
            : ""}
        </h1>
        <div className="progress-sec">
          <progress
            value={selectedOptions.length > 0 ? selectedOptions.length : 0}
            max={questions.length}
            className="progress-bar"
          ></progress>
          <p>
            Question <strong>{index + 1}</strong> / {questions.length}
          </p>
          <p>
            <strong>{points}</strong> / {maxPoints}
          </p>
        </div>
        <h1>{questions[index].question}</h1>
        <div className="options">
          {Array.from({ length: 4 }, (len, i) => (
            <Option
              key={i}
              questions={questions}
              index={index}
              i={i}
              dispatch={dispatch}
              selectedOptions={selectedOptions}
              choice={choice}
            />
          ))}
        </div>
        <div className="btn-component">
          <Timer>
            {Math.floor(maxTime / 60) < 10 ? "0" : ""}
            {Math.floor(maxTime / 60)}:{" "}
            {Math.floor(maxTime % 60) < 10 ? "0" : ""}
            {Math.floor(maxTime % 60)}
          </Timer>
          {selectedOptions.length > index && index < questions.length - 1 && (
            <Button handleFunction={handleNext}>Next</Button>
          )}
          {gameEnded && <Button handleFunction={handleFinish}>Finish</Button>}
        </div>
      </div>
    </div>
  );
}

export default DisplayQuestion;
