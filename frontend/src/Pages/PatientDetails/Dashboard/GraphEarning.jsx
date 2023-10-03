import React, { useState } from 'react'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const GraphEarning = ({UserData}) => {

   const UserData3 = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
    },
    {
      id: 5,
      year: 2021,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2022,
      userGain: 4300,
      userLost: 234,
    },
    {
      id: 5,
      year: 2023,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2024,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2025,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2026,
      userGain: 4300,
      userLost: 234,
    },
    {
      id: 5,
      year: 2027,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2028,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2029,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2030,
      userGain: 4300,
      userLost: 234,
    },
    {
      id: 5,
      year: 2031,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2032,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2033,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2034,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2035,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2036,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2037,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2038,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2039,
      userGain: 4300,
      userLost: 234,
    },
    {
      id: 5,
      year: 2040,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2041,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2042,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2043,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2044,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2045,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2046,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2047,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2048,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2049,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2050,
      userGain: 4300,
      userLost: 234,
    },
    {
      id: 5,
      year: 2051,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2052,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2053,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2054,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2055,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2056,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2057,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2058,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2059,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2060,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2061,
      userGain: 4300,
      userLost: 234,
    },
    {
      id: 5,
      year: 2040,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2041,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2042,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2043,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2044,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2045,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2046,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2047,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2048,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2049,
      userGain: 4300,
      userLost: 234,
    },{
      id: 5,
      year: 2050,
      userGain: 4300,
      userLost: 234,
    },
  ];
  


  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.date),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.Appofees),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <div>
         <Line data={userData} />;

    </div>
  )
}

export default GraphEarning