
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState("");

  const calculate = (expression) => {
    try {
      if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
        return "Error";
      }

      const result = Function(
        '"use strict"; return (' + expression + ')'
      )();

      if (!Number.isFinite(result)) return "Error";

      return String(Number(result.toFixed(10)));
    } catch {
      return "Error";
    }
  };

  const handleClick = (value) => {
    if (value === "AC") {
      setDisplay("0");
      setHistory("");
    }
    else if (value === "DEL") {
      setDisplay(prev =>
        prev.length > 1 ? prev.slice(0, -1) : "0"
      );
    }
    else if (value === "=") {
      const result = calculate(display);

      if (result !== "Error") {
        setHistory(display + " =");
      }

      setDisplay(result);
    }
    else {
      setDisplay(prev =>
        prev === "0" || prev === "Error"
          ? value
          : prev + value
      );
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if ("0123456789+-*/.%".includes(e.key) && e.key.length === 1) {
        handleClick(e.key);
      }
      else if (e.key === "Enter" || e.key === "=") {
        handleClick("=");
      }
      else if (e.key === "Backspace") {
        handleClick("DEL");
      }
      else if (e.key === "Escape") {
        handleClick("AC");
      }
    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  });

  const buttons = [
    { text: "AC", type: "clear" },
    { text: "DEL", type: "clear" },
    { text: "%", type: "operator" },
    { text: "/", type: "operator" },

    { text: "7" },
    { text: "8" },
    { text: "9" },
    { text: "*", type: "operator" },

    { text: "4" },
    { text: "5" },
    { text: "6" },
    { text: "-", type: "operator" },

    { text: "1" },
    { text: "2" },
    { text: "3" },
    { text: "+", type: "operator" },

    { text: "00" },
    { text: "0" },
    { text: "." },
    { text: "=", type: "equal" }
  ];

  return (
    <div className="app">

      <div className="calculator">

        <div className="top">
          <div>
            <span className="logo">✦</span>
            <span className="brand">CALCULATOR</span>
          </div>
          <span className="mode">● ONLINE</span>
        </div>

        <div className="screen">

          <p className="history">{history || "Welcome back!"}</p>

          <div className="display">
            {display}
          </div>

          <p className="screen-label">RESULT</p>

        </div>

        <div className="keypad">

          {buttons.map((btn, index) => (
            <button
              key={index}
              className={`key ${btn.type || ""}`}
              onClick={() => handleClick(btn.text)}
            >
              {btn.text === "*" ? "×" :
               btn.text === "/" ? "÷" :
               btn.text === "DEL" ? "⌫" :
               btn.text}
            </button>
          ))}

        </div>

        <div className="footer">
          <span>POWERED BY REACT</span>
          <span>✦ SMART CALCULATOR</span>
        </div>

      </div>

    </div>
  );
}

export default App;
