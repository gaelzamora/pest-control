import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import { getTechnicianRegisters } from "../api/registers";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MultipleRegistersChart: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-technician-registers"],
    queryFn: getTechnicianRegisters, // Aquí llamamos directamente a la función
  });

  const [groupedChartData, setGroupedChartData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      // Agrupar datos por owner_id
      const groupedData = data.reduce((acc: any, entry: any) => {
        const ownerId = entry.owner.id;
        const ownerCompany = entry.owner.company;

        if (!acc[ownerId]) {
          acc[ownerId] = {
            company: ownerCompany, // Almacenar el nombre de la empresa
            labels: [], // Fechas únicas
            datasets: [
              {
                label: `Registros del Owner ${ownerCompany}`,
                data: [],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          };
        }
        acc[ownerId].labels.push(entry.date);
        acc[ownerId].datasets[0].data.push(entry.count);
        return acc;
      }, {});

      setGroupedChartData(groupedData);
    } else {
      console.error("Datos incorrectos o vacíos:", data);
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

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center mt-32 text-4xl text-gray-600 font-semibold">
        <p>No hay registros de empresas.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {Object.entries(groupedChartData).map(([ownerId, chartData]) => (
        <div key={ownerId} className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-2">
            {chartData.company ? `Empresa: ${chartData.company}` : `Company: Catch Me`}
          </h3>
          <Bar
            data={{
              labels: chartData.labels,
              datasets: chartData.datasets,
            }}
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
      ))}
    </div>
  );
};

export default MultipleRegistersChart;
