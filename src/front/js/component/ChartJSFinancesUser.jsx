// src/components/BarChart.js
import React, { useContext, useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from "chart.js";
import { Context } from "../store/appContext";

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

export function ChartJSFinancesUser() {
  const [income, setIncome] = useState([0])
  const [bills, setBills] = useState([0])
  const [date, setDate] = useState([0])
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const getFinance = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/finances/${store.userData.id}`)
        const data = await response.json()
        const billsData = data
          .filter(item => item.id_category === 1) // Filtra los objetos son Gastos
          .map(item => item.amount); // Extrae la cantidad

        const incomesData = data
          .filter(item => item.id_category === 2) // Filtra los objetos son Ingresos
          .map(item => item.amount); // Extrae la cantidad

        const dateData = data
          .map(item => item.date); // Extrae la fecha

        const formatDate = dateData.map(item => {
          return new Date(item).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        })

        setBills(billsData); // Actualiza el estado
        setIncome(incomesData); // Actualiza el estado
        setDate(formatDate); // Actualiza el estado
      } catch (error) {
        console.log('Error getting finance', error)
      }
    }

    getFinance()
  }, [])

  const data = {
    labels: date,
    datasets: [
      {
        label: "Ingresos",
        data: income,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Gastos",
        data: bills,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  }

  return <Line data={data} />;
};
