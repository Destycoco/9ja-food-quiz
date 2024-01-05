export default function Option({
  questions,
  index,
  i,
  dispatch,
  selectedOptions,
  choice,
}) {
  const isCorrectAnswer = i === questions[index].answer;
  const backgroundColor =
    choice !== null && isCorrectAnswer
      ? "green"
      : choice !== null && !isCorrectAnswer
      ? "red"
      : "";
  const userAnswer = i === selectedOptions[index];
  return (
    <>
      {questions[index] && questions[index].options && (
        <button
          disabled={selectedOptions.length > index}
          onClick={() => dispatch({ type: "option", payLoad: i })}
          style={{
            backgroundColor,
            border: `${userAnswer ? "2px solid white" : "none"}`,
            boxShadow: `${
              userAnswer ? "0px 0px 12px 1px rgba(0, 0, 0, 0.5)" : "none"
            }`,
            transform: `${userAnswer ? "translateX(20px)" : ""}`,
            transition: `${userAnswer ? "0.5s" : ""}`,
          }}
        >
          {questions[index].options[i]}
        </button>
      )}
    </>
  );
}
