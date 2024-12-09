import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import { getRegistersLastSevenDays } from "../api/registers"; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const RegistersChart: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["registers-last-7-days"],
    queryFn: getRegistersLastSevenDays
  });

  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [] as any[],
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const labels = data.map((entry: { date: string }) => entry.date);
      const counts = data.map((entry: { count: number }) => entry.count);
  
      setChartData({
        labels,
        datasets: [
          {
            label: "Registers in the last 7 days",
            data: counts,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    } else {
      console.error("Datos incorrectos:", data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-10">
        <BeatLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Error loading data.</p>
      </div>
    );

  }

  return (
    <div className="w-full h-[27rem] flex items-center justify-center">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default RegistersChart;
