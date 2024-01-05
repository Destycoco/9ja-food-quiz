function Timer({ children }) {
  const styling = {
    height: `60px`,
    width: `160px`,
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
    <>
      <button style={styling}>{children}</button>
    </>
  );
}

export default Timer;
