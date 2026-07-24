import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PieRevenueChart({ invoices }) {

  const data = {

    labels: invoices.map(
      (invoice) => invoice.invoiceNumber
    ),

    datasets: [

      {

        label: "Revenue",

        data: invoices.map((invoice) =>

          invoice.items.reduce(

            (sum, item) =>
              sum + item.quantity * item.price,

            0
          )
        ),

        backgroundColor: [

          "#4F46E5",
          "#22C55E",
          "#F59E0B",
          "#EF4444",
          "#06B6D4",
          "#8B5CF6",

        ],

        borderWidth: 1,

      },

    ],

  };

  return <Pie data={data} />;

}

export default PieRevenueChart;