function Button({ children, width = 160, height = 60, handleFunction }) {
  const styling = {
    height: `${height}px`,
    width: `${width}px`,
    fontSize: "25px",
    borderRadius: "40px",
    cursor: "pointer",
    background: "linear-gradient(to bottom, #45e645, green)",
    boxShadow: "0px 0px 13px 1.2px rgba(0,0,0, 0.5)",
    color: "white",
    border: "none",
    fontWeight: 600,
  };

  return (
    <button className="btn" style={styling} onClick={() => handleFunction()}>
      {children}
    </button>
  );
}
// dispatch({ type: "nextQuestion" })
export default Button;
