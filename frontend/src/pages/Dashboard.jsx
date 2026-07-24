import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Dashboard.css";
import RevenueChart from "./RevenueChart";
import Navbar from "../components/Navbar";
import PieRevenueChart from "../components/PieRevenueChart";

function Dashboard() {

  const navigate = useNavigate();

  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {

    try {

      const response = await API.get("/invoice");

      setInvoices(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const totalInvoices = invoices.length;

  const totalRevenue = invoices.reduce((sum, invoice) => {

    const invoiceTotal = invoice.items.reduce(

      (s, item) => s + (item.quantity * item.price),

      0

    );

    return sum + invoiceTotal;

  }, 0);

  const totalClients = new Set(

    invoices.map((invoice) => invoice.clientName)

  ).size;

  return (

    <>

<Navbar />

    <div className="dashboard-container">

      <h1>Dashboard</h1>

      <div className="card-container">

        <div className="card">

          <h2>Total Invoices</h2>

          <p>{totalInvoices}</p>

        </div>

        <div className="card">

          <h2>Total Revenue</h2>

          <p>₹{totalRevenue}</p>

        </div>

        <div className="card">

          <h2>Total Clients</h2>

          <p>{totalClients}</p>

        </div>

      </div>

      <div className="dashboard-buttons">

        <button onClick={() => navigate("/create")}>
          Create Invoice
        </button>

        <button onClick={() => navigate("/history")}>
          Invoice History
        </button>

      </div>

      <div className="chart-container">

    <div className="chart-box">

        <RevenueChart
            invoices={invoices}
        />

    </div>

    <div className="chart-box">

        <PieRevenueChart
            invoices={invoices}
        />

    </div>

</div>

      <h2 className="recent-title">Recent Invoices</h2>

<table className="recent-table">

  <thead>

    <tr>

      <th>Invoice No</th>
      <th>Client</th>
      <th>Company</th>
      <th>Total</th>

    </tr>

  </thead>

  <tbody>

    {

      invoices.slice(-5).reverse().map((invoice)=>(

        <tr key={invoice._id}>

          <td>{invoice.invoiceNumber}</td>

          <td>{invoice.clientName}</td>

          <td>{invoice.companyName}</td>

          <td>

            ₹{

              invoice.items.reduce(

                (sum,item)=>sum+(item.quantity*item.price),

                0

              )

            }

          </td>

        </tr>

      ))

    }

  </tbody>

</table>

    </div>

  </>
  );

}

export default Dashboard;