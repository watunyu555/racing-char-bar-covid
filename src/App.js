import React, { useState, useEffect } from "react";
import RacingBarChart from "./RacingBarChart";
import useInterval from "./useInterval";
import Datacovid from "./datacovid.json";
import "./App.css";

function App() {
  const [iteration, setIteration] = useState(0);
  const [start, setStart] = useState(true);
  const [data, setData] = useState();

  const timeLines = Datacovid.map((item)=>{
    return item.timeline
  })

  const keyNames = timeLines.map(obj => Object.keys(obj.cases));

  const dayofCovid = keyNames[0];

  useEffect(() => {
    refactorData();
  }, []);

  const refactorData = () => {
    setData(
      Datacovid.map((item) => {
        return {
          name: item.country,
          value: item.timeline.cases[dayofCovid[iteration]],
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        };
      })
    );
  };

  useInterval(() => {
    if (start) {
      if (iteration === 29) {
        setIteration(0);
      } else {
        setIteration(iteration + 1);
      }
      setData(
        data.map((item,index) => {
          return {
            ...item, value: Datacovid.map(({timeline,country})=>({cases:timeline.cases,country})).filter(({country})=>country===item.name)[0].cases[dayofCovid[iteration]]
          };
        })
      );
    }
  }, 300);

  return (
    <React.Fragment>
      <h1>Covid Global Cases by SNG</h1>
      <h5>Date : {dayofCovid[iteration]}</h5>
      <RacingBarChart data={data} />
      {/* <button onClick={() => setStart(!start)}>
        {start ? "Stop the race" : "Start the race!"}
      </button> */}
      {/* <p>Iteration: {iteration}</p> */}
    </React.Fragment>
  );
}

export default App;
