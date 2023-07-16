import { useState } from "react";
import img from "./icon-person.svg";
function App() {
  return (
    <div className="app">
      <h1>SPLI</h1>
      <h1>TTER</h1>
      <TipCalculator />
    </div>
  );
}
export default App;

function TipCalculator() {
  const [bill, setBill] = useState(0);
  const [numPeople, setNumPeople] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [selected, setSelected] = useState(null);

  const buttons = [
    { tip: 5 },
    { tip: 10 },
    { tip: 15 },
    { tip: 25 },
    { tip: 50 },
  ];

  const tipAmount = ((bill * (tipPercentage / 100)) / numPeople).toFixed(2);
  const total = ((bill + Number(tipAmount)) / numPeople).toFixed(2);
  function handleTip(e) {
    e.preventDefault();
    if (bill <= 0) return;
    if (numPeople === 0) setNumPeople(1);
    setTipPercentage(+e.target.value);
    setSelected(+e.target.value);
  }
  function handleTotal() {
    if (total === "NaN" || tipAmount === "Infinity") {
      return <h1>0</h1>;
    }
    if (total.length <= 7) {
      return <h1>{total}</h1>;
    }
    if (total.length > 7) {
      return <h4>{total}</h4>;
    }
  }
  function handleTipItem() {
    if (tipAmount === "NaN" || tipAmount === "Infinity") {
      return <h1>0</h1>;
    }
    if (tipAmount.length <= 7) {
      return <h1>{tipAmount}</h1>;
    }
    if (tipAmount.length > 7) {
      return <h4>{tipAmount}</h4>;
    }
  }

  function handleReset() {
    setBill(0);
    setNumPeople(0);
    setTipPercentage("Custom");
    setSelected(0);
  }

  return (
    <div className="container">
      <div className="calculator">
        <form className="bill-form">
          <label>Bill</label>
          <input
            type="text"
            value={bill}
            onChange={(e) =>
              setBill(isNaN(e.target.value) ? 0 : +e.target.value)
            }
          ></input>
        </form>
        <div className="tip">
          <img src="images/icon-person.svg" alt="img"></img>
          <label>Select Tip %</label>
          <div className="tip-btns">
            {buttons.map((btn, i) => (
              <button
                onClick={handleTip}
                value={btn.tip}
                style={
                  selected === btn.tip
                    ? { backgroundColor: "var(--strong-cyan)" }
                    : {}
                }
                key={i}
              >
                {btn.tip}%
              </button>
            ))}

            <input
              type="text"
              placeholder="Custom"
              value={tipPercentage}
              onClick={() => setTipPercentage(0)}
              onChange={(e) =>
                setTipPercentage(isNaN(+e.target.value) ? 0 : +e.target.value)
              }
            ></input>
          </div>
        </div>
        <form className="people-form">
          <label>Number of People</label>
          <input
            type="text"
            value={numPeople}
            onClick={() => setNumPeople(0)}
            onChange={(e) =>
              setNumPeople(isNaN(e.target.value) ? 0 : +e.target.value)
            }
          ></input>
        </form>
      </div>
      <div className="display">
        <div className="disp-item">
          <p>
            Tip Amount <br></br> <span>/person</span>
          </p>
          {handleTipItem()}
          <p>
            Total <br></br>
            <span>/person</span>
          </p>
          {handleTotal()}
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}
