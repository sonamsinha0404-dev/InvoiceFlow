import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function RevenueChart({ invoices }) {

  const labels = invoices.map((invoice) => invoice.invoiceNumber);

  const revenue = invoices.map((invoice) =>

    invoice.items.reduce(

      (sum, item) => sum + item.quantity * item.price,

      0

    )

  );

  const data = {
    labels,

    datasets: [
      {
        label: "Revenue",

        data: revenue,

        backgroundColor: "#4f46e5",
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,

        text: "Invoice Revenue",
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default RevenueChart;