import "./index.css";

function Button({ onClick, text }) {
  return (
    <button
      onClick={() => {
        onClick();
      }}
    >
      {text}
    </button>
  );
}

export { Button };
