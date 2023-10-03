import React from "react";
import { Chart } from "react-google-charts";

export const data = [
    ["x", "earning"],
    [0, 0],
    [1, 10],
    [2, 23],
    [3, 17],
    [4, 18],
    [5, 9],
    [6, 11],
    [7, 27],
  ];
 const options = {
 
  series: {
    0: { curveType: "function" },
  },
};

export default function Graph() {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
