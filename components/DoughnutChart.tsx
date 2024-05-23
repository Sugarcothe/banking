"use client";

import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: "Banks",
        data: [1234, 2345, 7635],
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
    labels: ["Bank 1", "Bank 2", "Bank 3"],
  };

  return (
    <div>
      <Doughnut 
      data={data}
      options={{
        cutout: "40%",
        plugins: {
          legend: {
            display: false
          }
        }
      }}
       />
    </div>
  );
};

export default DoughnutChart;
