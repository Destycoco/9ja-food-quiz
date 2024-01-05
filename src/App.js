import { useEffect, useReducer } from "react";
import Header from "./Header";
import Welcome from "./Welcome";
import Main from "./Main";
import Loader from "./Loader";
import Level from "./Level";
import DisplayQuestion from "./DisplayQuestion";
import ScoreScreen from "./ScoreScreen";

const initialState = {
  questions: [],
  status: "loading",
  level: null,
  index: 0,
  selectedOptions: [],
  points: 0,
  maxPoints: 0,
  highScore: 0,
  choice: null,
  maxTime: null,
};
// const SECS = 25;
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        status: "ready",
        questions: action.payLoad,
      };
    case "selectLevel":
      return {
        ...state,
        status: "selectLevel",
      };
    case "easy":
      return {
        ...state,
        status: "active",
        level: "easy",
        questions: state.questions
          .slice()
          .filter((question) => question.difficulty === "easy"),
        maxPoints: state.questions
          .filter((question) => question.difficulty === "easy")
          .reduce((acc, cur) => acc + cur.point, 0),
        maxTime:
          state.questions
            .slice()
            .filter((question) => question.difficulty === "medium").length * 15,
      };
    case "medium":
      return {
        ...state,
        status: "active",
        level: "medium",
        questions: state.questions
          .slice()
          .filter((question) => question.difficulty === "medium"),
        maxPoints: state.questions
          .filter((question) => question.difficulty === "medium")
          .reduce((acc, cur) => acc + cur.point, 0),
        maxTime:
          state.questions
            .slice()
            .filter((question) => question.difficulty === "medium").length * 20,
      };
    case "hard":
      return {
        ...state,
        level: "hard",
        status: "active",
        questions: state.questions
          .slice()
          .filter((question) => question.difficulty === "hard"),
        maxPoints: state.questions
          .filter((question) => question.difficulty === "hard")
          .reduce((acc, cur) => acc + cur.point, 0),
        maxTime:
          state.questions
            .slice()
            .filter((question) => question.difficulty === "medium").length * 25,
      };
    case "option":
      const isCorrect = action.payLoad === state.questions[state.index].answer;

      return {
        ...state,
        selectedOptions: [...state.selectedOptions, action.payLoad],
        choice: action.payload,
        points: isCorrect
          ? state.points + state.questions[state.index].point
          : state.points,
        maxPoints: state.questions.reduce((acc, cur) => acc + cur.point, 0),
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        choice: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        index: 0,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...state,
        status: "selectLevel",
        selectedOptions: [],
        points: 0,
        questions: action.payLoad,
        choice: null,
      };
    case "timer":
      return {
        ...state,
        maxTime: state.maxTime - 1,
        status: state.maxTime === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("unexpected action");
  }
}
function App() {
  const [
    {
      questions,
      status,
      level,
      index,
      selectedOptions,
      points,
      maxPoints,
      highScore,
      choice,
      maxTime,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const max_possible_questions = questions.length / 3;

  // let displayQuestions;
  console.log(questions);
  console.log(selectedOptions);

  // console.log(points);
  console.log(level);
  useEffect(() => {
    fetch("http://localhost:8000/quiz")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payLoad: data }))
      .catch((err) => dispatch({ type: "dataError" }));
  }, []);
  return (
    <div>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <Welcome
            questionLength={max_possible_questions}
            dispatch={dispatch}
          />
        )}
        {status === "selectLevel" && <Level dispatch={dispatch} />}
        {status === "active" && (
          <DisplayQuestion
            questions={questions}
            index={index}
            dispatch={dispatch}
            points={points}
            selectedOptions={selectedOptions}
            level={level}
            maxPoints={maxPoints}
            choice={choice}
            maxTime={maxTime}
          />
        )}
        {status === "finished" && (
          <ScoreScreen
            maxPoints={maxPoints}
            points={points}
            dispatch={dispatch}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
