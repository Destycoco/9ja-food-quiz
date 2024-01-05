export default function Level({ dispatch }) {
  return (
    <div className="level-section">
      <h1>Select Level</h1>
      <div className="level">
        <button onClick={() => dispatch({ type: "easy" })}>Easy</button>
        <button onClick={() => dispatch({ type: "medium" })}>Medium</button>
        <button onClick={() => dispatch({ type: "hard" })}>Hard</button>
      </div>
    </div>
  );
}
