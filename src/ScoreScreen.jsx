import Button from "./Button";
export default function ScoreScreen({
  maxPoints,
  points,
  dispatch,
  highScore,
}) {
  const percentScore = (points / maxPoints) * 100;
  function handleRestart() {
    fetch("http://localhost:8000/quiz")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "restart", payLoad: data }))
      .catch((err) => dispatch({ type: "dataError" }));
  }
  return (
    <div className="score-sec">
      <h1>
        <span>
          {percentScore >= 70
            ? "🤩💥"
            : percentScore < 70 && percentScore >= 60
            ? "🤗"
            : percentScore <= 59 && percentScore > 40
            ? "😔"
            : "😔"}{" "}
        </span>
        You Scored {points} out of {maxPoints} ({percentScore.toFixed(2)})%
      </h1>
      <p>Highscore: {highScore >= points ? highScore : points} </p>
      <Button handleFunction={handleRestart}>Restart</Button>
    </div>
  );
}
