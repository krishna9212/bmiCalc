import { useCallback, useEffect, useState } from "react";

function App() {
  const [bmi, setbmi] = useState(0);
  const [height, setHeight] = useState(
    localStorage.getItem("height") ? Number(localStorage.getItem("height")) : 0
  );
  const [weight, setWeight] = useState(
    localStorage.getItem("weight") ? Number(localStorage.getItem("weight")) : 0
  );
  const [message, setmessage] = useState("");
  const [bg, setbg] = useState("bg-violet-900");
  const bmiMessage = useCallback(() => {
    if (bmi <= 18.5) {
      setmessage("Underweight");
      setbg("bg-violet-200");
    } else if (bmi <= 24.9) {
      setmessage("Healthy weight");
      setbg("bg-violet-400");
    } else if (bmi <= 29.9) {
      setmessage("Overweight");
      setbg("bg-violet-600");
    } else {
      setmessage("Obese");
      setbg("bg-violet-800");
    }
  }, [bmi]);

  const bmiCal = useCallback(() => {
    const BMI = (weight / (height / 100) ** 2).toFixed(2);
    setbmi(BMI);
  }, [height, weight]);

  useEffect(() => {
    bmiMessage();
    bmiCal();
  }, [weight, height]);

  return (
    <>
      <div
        className={`hero h-screen w-screen gap-2 text-white flex flex-col md:flex-row justify-between  items-center p-0 md:px-16 ${bg} `}
      >
        <div className="card bg-violet-800 mt-5 h-[72%] w-[90%] md:h-[75%] md:w-[30%] rounded-xl shadow-xl shadow-violet-500 flex justify-center items-center">
          <div className="inner card rounded-xl   overflow-hidden h-[93%] w-[93%] flex flex-col gap-2">
            <div className="headerSEC  p-3 text-xl text-center font-bold ">
              BMI Calculator
            </div>
            <div className="weightSEC flex  justify-center items-center p-2 ">
              <div className="weightSEC h-[90%] w-[90%]  flex flex-col gap-1 ">
                <label htmlFor="weightInput" className="font-medium ">
                  weight (kgs)
                </label>
                <input
                  type="number"
                  name="weight"
                  id="weightInput"
                  className="p-2 outline-violet-500 rounded-md text-black"
                  placeholder="Enter weight value"
                  value={weight}
                  onChange={(e) => {
                    setWeight(Number(e.target.value));
                    localStorage.setItem("weight", `${weight}`);
                  }}
                />
              </div>
            </div>
            <div className="heightSEC flex justify-center items-center p-2 ">
              <div className="heightSEC h-[90%] w-[90%]  flex flex-col gap-1 ">
                <label htmlFor="heightInput" className="font-medium ">
                  height (cms)
                </label>
                <input
                  type="number"
                  name="height"
                  id="heightInput"
                  className="p-2 outline-violet-500 rounded-md text-black"
                  placeholder="Enter height value"
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                    localStorage.setItem("height", `${height}`);
                  }}
                />
              </div>
            </div>
            <div className="buttons flex flex-col   ">
              <div className="submitSEC flex  justify-center items-center p-2 ">
                <div className="submitSEC h-full  w-[90%]  flex flex-col">
                  <button
                    onClick={() => {
                      bmiCal(), bmiMessage();
                    }}
                    className="text-center text-xl h-full bg-violet-700 font-semibold text-white rounded-md p-[6.5px] duration-500  hover:text-black hover:bg-violet-800 "
                  >
                    submit
                  </button>
                </div>
              </div>
              <div className="ReloadSEC flex  justify-center items-center p-2 ">
                <div className="ReloadSEC h-full w-[90%]  flex flex-col">
                  <button
                    onClick={() => {
                      setHeight(0),
                        setWeight(0, setmessage(""), setbmi(0)),
                        localStorage.setItem("height", "0"),
                        localStorage.setItem("weight", "0");
                      setbg("bg-violet-100");
                    }}
                    className="text-center text-xl h-full bg-violet-100 rounded-md p-[6.5px] font-semibold text-black duration-500  hover:text-white hover:bg-violet-800 "
                  >
                    Reload
                  </button>
                </div>
              </div>
            </div>
            <div className="bmiSEC flex justify-start pl-8 flex-col text-white pt-4 ">
              <h1 className="capitalise text-xl ">your bmi is - {bmi}</h1>
              <h1 className="capitalise text-xl">your bodyState - {message}</h1>
            </div>
          </div>
        </div>
        <div className="info flex flex-col w-[90%] md:w-[30%] gap-2 text-white p-10 bg-violet-800 rounded-xl text-xl font-medium mb-10">
          {[
            "1 foot is equal to 30.48 centimeters.",
            " 1 inch is equal to 2.54 centimeters.",
          ].map((information, index) => {
            return (
              <div key={index} className={`sec${index}`}>
                <h1 className={`${index}`}>{information}</h1>
              </div>
            );
          })}
        </div>
      </div>
      ;
    </>
  );
}

export default App;
