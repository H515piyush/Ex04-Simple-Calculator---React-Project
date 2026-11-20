# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
# Ex04 Simple Calculator - React Project
## Date: 20/11/2026
## Name : Piyush Kumar
## Reg No : 212223220075

## AIM
To  develop a Simple Calculator using React.js with clean and responsive design, ensuring a smooth user experience across different screen sizes.

## ALGORITHM
### STEP 1
Create a React App.

### STEP 2
Open a terminal and run:
  <ul><li>npx create-react-app simple-calculator</li>
  <li>cd simple-calculator</li>
  <li>npm start</li></ul>

### STEP 3
Inside the src/ folder, create a new file Calculator.js and define the basic structure.

### STEP 4
Plan the UI: Display screen, number buttons (0-9), operators (+, -, *, /), clear (C), and equal (=).

### STEP 5
Create a new file Calculator.css in src/ and add the styling.

### STEP 6
Open src/App.js and modify it.

### STEP 7
Start the development server.
  npm start

### STEP 8
Open http://localhost:3000/ in the browser.

### STEP 9
Test the calculator by entering numbers and operations.

### STEP 10
Fix styling issues and refine content placement.

### STEP 11
Deploy the website.

### STEP 12
Upload to GitHub Pages for free hosting.

## PROGRAM
## App.jsx
```

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
```
## App.css
```

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: #090b16;
}

.app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  background:
    radial-gradient(circle at 20% 20%, #31205d, transparent 35%),
    radial-gradient(circle at 80% 80%, #172b51, transparent 35%),
    #090b16;
}

.calculator {
  width: 370px;
  padding: 28px;
  border-radius: 28px;
  background: #191b2b;
  border: 1px solid #38384d;
  box-shadow: 0 25px 70px rgba(0,0,0,.5);
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.logo {
  color: #a78bfa;
  font-size: 25px;
  margin-right: 8px;
}

.brand {
  color: white;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 2px;
}

.mode {
  color: #4ade80;
  font-size: 9px;
}

.screen {
  min-height: 145px;
  padding: 20px 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}

.history {
  color: #888ba3;
  font-size: 13px;
  margin-bottom: 15px;
}

.display {
  color: white;
  font-size: clamp(30px, 8vw, 43px);
  font-weight: 700;
  width: 100%;
  text-align: right;
  overflow-x: auto;
  white-space: nowrap;
}

.screen-label {
  color: #a78bfa;
  font-size: 10px;
  letter-spacing: 3px;
  margin-top: 12px;
}

.keypad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 15px;
}

.key {
  height: 65px;
  border: none;
  border-radius: 18px;
  background: #25283b;
  color: white;
  font-size: 21px;
  font-weight: 600;
  cursor: pointer;
  transition: .2s;
}

.key:hover {
  background: #383c55;
  transform: translateY(-3px);
}

.key:active {
  transform: scale(.94);
}

.clear {
  background: #39334e;
  color: #c4b5fd;
  font-size: 16px;
}

.operator {
  background: #352a52;
  color: #c4a5ff;
  font-size: 24px;
}

.equal {
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  color: white;
}

.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  color: #777b94;
  font-size: 8px;
  letter-spacing: 1px;
}

@media (max-width: 420px) {
  .calculator {
    width: 100%;
    padding: 22px;
  }

  .key {
    height: 58px;
  }
}
```
## Index.css
```
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  min-height: 100%;
}

body {
  font-family: Arial, sans-serif;
  background: #090b16;
}
```



## OUTPUT
<img width="1912" height="382" alt="image" src="https://github.com/user-attachments/assets/0c9be35c-1a82-4b30-9d63-650f1b08845d" />
<img width="1917" height="963" alt="Screenshot 2026-11-20 153200" src="https://github.com/user-attachments/assets/3ae5381e-459d-48e5-8d23-138ca3c9485a" />




## RESULT
The program for developing a simple calculator in React.js is executed successfully.
