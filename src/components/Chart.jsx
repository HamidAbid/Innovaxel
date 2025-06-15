import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";
import { useExpenses } from "../store/ExpenseContext";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartComponent() {
  const { expenses } = useExpenses();

  //  1. Total amount spent
  const totalAmount = expenses.reduce((sum, item) => sum + Number(item.amount), 0);


  //  2. Category-wise breakdown (group by 'category')
  const categoryMap = {};
  expenses.forEach((item) => {
    if (categoryMap[item.category]) {
      categoryMap[item.category] += item.amount;
    } else {
      categoryMap[item.category] = item.amount;
    } 
  });

  const categoryLabels = Object.keys(categoryMap);
  const categoryAmounts = Object.values(categoryMap);

  //  Bar chart by category
  const barData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Amount by category",
        data: categoryAmounts,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  //  Pie chart by category
  const pieData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "category Breakdown",
        data: categoryAmounts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#66BB6A",
          "#BA68C8",
          "#FF7043",
        ],
      },
    ],
  };

  return (
    <div  className=" mt-40 text-center">
      <h1 className="text-3xl">Total Spent: Rs. {totalAmount}</h1>

     <div className="flex flex-col md:flex-row w-full ` justify-evenly items-center my-10 gap-5">
     <div className="w-1/2 md:w-1/3">
        <h3 className="text-xl">Bar Chart - Category-wise Breakdown</h3>
        <Bar data={barData} />
      </div>

      <div className="w-[40%]  md:w-1/5">
        <h3 className="text-xl">Pie Chart - Category-wise Breakdown</h3>
        <Pie data={pieData} />
      </div>
     </div>
    </div>
  );
}
