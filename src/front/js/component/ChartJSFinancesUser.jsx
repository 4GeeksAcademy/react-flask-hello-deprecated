import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, Filler, PointElement } from "chart.js";

// Registramos los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  PointElement
);

// export function ChartJSFinancesUser({ finance }) {
//   const [chartData, setChartData] = useState({ labels: [], incomes: [], expenses: [] });
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem('user')
//     return savedUser ? JSON.parse(savedUser) : null
//   })

//   Hook useEffect para obtener los datos
//   useEffect(() => {
//     if (finance && finance.length > 0) {  //Eliminé el fetch y utilizé la prop finance.
//       try {
//         // Agrupamos datos por fecha
//         const groupedData = data.reduce((acc, item) => {
//           const formattedDate = new Date(item.date).toISOString().split("T")[0];
//           if (!acc[formattedDate]) {
//             acc[formattedDate] = { incomes: null, expenses: null };
//           }
//           if (item.id_category === 1) {
//             acc[formattedDate].expenses += item.amount;
//           } else if (item.id_category === 2) {
//             acc[formattedDate].incomes += item.amount;
//           }
//           return acc;
//         }, {});
//         // fechas en orden cronologico
//         const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));
//         // Convertimos el objeto agrupado en arrays para el gráfico
//         const labels = sortedDates.map((date) =>
//           new Date(date).toLocaleDateString("es-ES", {
//             day: "numeric",
//             month: "long",
//             year: "numeric",
//           })
//         );
//         const incomes = sortedDates.map((date) => groupedData[date].incomes);
//         const expenses = sortedDates.map((date) => groupedData[date].expenses);

//         setChartData({ labels, incomes, expenses });

//       } catch (err) {
//         console.error("Error fetching finances:", err);
//         // setError(err.message || "Hubo un error al obtener los datos financieros.");
//       }
//     }
//   }, [finance]); //props

export function ChartJSFinancesUser({ finance }) {  // Recibe la prop finance con los datos de Home
  const [chartData, setChartData] = useState({ labels: [], incomes: [], expenses: [] });

  useEffect(() => {
    if (finance && finance.length > 0) {  //Eliminé el etch y lo sustituí por la prop
      const groupedData = finance.reduce((acc, item) => {
        const formattedDate = new Date(item.date).toISOString().split("T")[0];

        if (!acc[formattedDate]) {
          acc[formattedDate] = { incomes: 0, expenses: 0 };
        }

        if (item.id_category === 1) {
          acc[formattedDate].expenses += item.amount;
        } else if (item.id_category === 2) {
          acc[formattedDate].incomes += item.amount;
        }

        return acc;
      }, {});

      const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));

      const labels = sortedDates.map((date) =>
        new Date(date).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
      const incomes = sortedDates.map((date) => groupedData[date].incomes);
      const expenses = sortedDates.map((date) => groupedData[date].expenses);

      setChartData({ labels, incomes, expenses });
    }
  }, [finance]); //Array de finanace que llega como prop

  // Si los datos se cargaron correctamente, mostramos el gráfico con los datos obtenidos
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Gastos",
        data: chartData.expenses,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        fill: true,
      },
      {
        label: "Ingresos",
        data: chartData.incomes,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      filler: {
        propagate: false,
      },
      title: {
        display: true,
      },
    },
    pointBackgroundColor: "#fff",
    radius: 10,
    interaction: {
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  return <Line data={data} options={options} />;
}