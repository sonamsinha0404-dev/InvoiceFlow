import { useEffect, useState } from "react";
import API from "../api/axios";
import "./InvoiceHistory.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";


function InvoiceHistory() {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await API.get("/invoice");
      setInvoices(response.data);
    } catch (error) {
      console.log(error);
    }finally{

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  

  const deleteInvoice = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this invoice?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/invoice/${id}`);

    const oldNotifications =
  JSON.parse(localStorage.getItem("notifications")) || [];

oldNotifications.unshift({
  message: `Invoice Deleted`,
  time: new Date(),
});

const latestNotifications = oldNotifications.slice(0, 10);

localStorage.setItem(
  "notifications",
  JSON.stringify(latestNotifications)
);

    toast.success("Invoice Deleted Successfully");

    fetchInvoices();

  } catch (error) {
    console.log(error);

    toast.error("Failed to delete invoice");
  }
};

  const filteredInvoices = invoices.filter((invoice) => {
    return (
      invoice.clientName.toLowerCase().includes(search.toLowerCase()) ||
      invoice.companyName.toLowerCase().includes(search.toLowerCase()) ||
      invoice.invoiceNumber.toString().includes(search)
    );
  });

  if (loading) {

  return (
    <>
      <Navbar />
      <h2
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        Loading invoices...
      </h2>
    </>
  );

}

  return (
    <>

<Navbar />
    <div className="history-container">

      <h1>Invoice History</h1>

      <input
        className="search-box"
        type="text"
        placeholder="Search by Client, Company or Invoice No"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="history-table">

        <thead>

          <tr>
            <th>Invoice No</th>
            <th>Client</th>
            <th>Company</th>
            <th>Date</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

  {filteredInvoices.length === 0 ? (

    <tr>
      <td colSpan="6">
        <div className="empty-state">
          <h2>📄</h2>
          <p>No Invoices Found</p>
          <span>Create your first invoice.</span>
        </div>
      </td>
    </tr>

  ) : (

    filteredInvoices.map((invoice) => {
            const total = invoice.items.reduce(
              (sum, item) => sum + item.quantity * item.price,
              0
            );

            return (

              <tr key={invoice._id}>

                <td>{invoice.invoiceNumber}</td>

                <td>{invoice.clientName}</td>

                <td>{invoice.companyName}</td>

                <td>{invoice.invoiceDate}</td>

                <td>₹{total}</td>

                <td>

                  <button
                    className="view-btn"
                    onClick={() => navigate(`/view/${invoice._id}`)}
                  >
                    View
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit/${invoice._id}`)}
                    >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteInvoice(invoice._id)}
                    >
                    Delete
                  </button>

                </td>

              </tr>

            );

          })
        )}

        </tbody>

      </table>

    </div>
    </>
  );
}

export default InvoiceHistory;