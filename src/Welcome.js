function Welcome({ questionLength, dispatch }) {
  return (
    <div className="welcome-page">
      <div className="welcome-text">
        <h1>😋 Welcome to The 9JA Food Quiz</h1>
        <p>{questionLength} questions to test your knowledge on 9JA foods</p>
      </div>

      <button onClick={() => dispatch({ type: "selectLevel" })}>
        Start Quiz
      </button>
    </div>
  );
}

export default Welcome;
