import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CreateInvoice.css";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";


function CreateInvoice() {

  const { id } = useParams();
  const [companyName, setCompanyName] = useState("");
  const [clientName, setClientName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");

  const [serviceName, setServiceName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const addService = () => {

  if (
    serviceName.trim() === "" ||
    quantity <= 0 ||
    price <= 0
  ) {
    alert("Please fill all fields.");
    return;
  }

  const newService = {
    serviceName,
    quantity: Number(quantity),
    price: Number(price),
  };

  if (editIndex !== null) {

    const updated = [...items];

    updated[editIndex] = newService;

    setItems(updated);

    setEditIndex(null);

  } else {

    setItems([...items, newService]);

  }

  setServiceName("");
  setQuantity("");
  setPrice("");

};

const editService = (index) => {

  const service = items[index];

  setServiceName(service.serviceName);
  setQuantity(service.quantity);
  setPrice(service.price);

  setEditIndex(index);

};

const deleteService = (index) => {

  const updated = items.filter(
    (_, i) => i !== index
  );

  setItems(updated);

};

const fetchInvoice = async () => {

  if (!id) return;

  try {

    const response = await API.get(`/invoice/${id}`);

    const invoice = response.data;

    setCompanyName(invoice.companyName);
    setClientName(invoice.clientName);
    setInvoiceNumber(invoice.invoiceNumber);
    setInvoiceDate(invoice.invoiceDate);

    setItems(invoice.items);

  } catch (error) {

    console.log(error);

    alert("Failed to load invoice");

  }

};

useEffect(() => {

  fetchInvoice();

}, [id]);

const saveInvoice = async () => {

  if (
    companyName.trim() === "" ||
    clientName.trim() === "" ||
    invoiceNumber.trim() === "" ||
    invoiceDate === "" ||
    items.length === 0
  ) {
    toast.warning("Please complete the invoice.");
    return;
  }

  try {
    setLoading(true);
    if (id) {

  await API.put(`/invoice/${id}`, {
    companyName,
    clientName,
    invoiceNumber,
    invoiceDate,
    items,
  });
  const oldNotifications =
  JSON.parse(localStorage.getItem("notifications")) || [];

oldNotifications.unshift({
  message: `Invoice #${invoiceNumber} Updated`,
  time: new Date(),
});

const latestNotifications = oldNotifications.slice(0, 10);

localStorage.setItem(
  "notifications",
  JSON.stringify(latestNotifications)
);

  toast.success("Invoice Updated Successfully");

} else {

  await API.post("/invoice", {
  companyName,
  clientName,
  invoiceNumber,
  invoiceDate,
  items,
});

// Notification Save
const oldNotifications =
  JSON.parse(localStorage.getItem("notifications")) || [];

oldNotifications.unshift({
  message: `Invoice #${invoiceNumber} Created`,
  time: new Date(),
});

localStorage.setItem(
  "notifications",
  JSON.stringify(oldNotifications)
);

toast.success("Invoice Saved Successfully");

}

    setCompanyName("");
    setClientName("");
    setInvoiceNumber("");
    setInvoiceDate("");

    setItems([]);
    setLoading(false);

  } catch (error) {
    setLoading(false);

    console.log(error);

    toast.error("Failed to save invoice");

  }

};

  return (

    <>

<Navbar />
    <div className="invoice-container">

      <div className="invoice-card">

        <h1>Create Invoice</h1>

        <div className="input-group">

          <label>Company Name</label>

          <input
            type="text"
            placeholder="Enter Company Name"
            value={companyName}
            onChange={(e)=>setCompanyName(e.target.value)}
          />

        </div>

        <div className="input-group">

          <label>Client Name</label>

          <input
            type="text"
            placeholder="Enter Client Name"
            value={clientName}
            onChange={(e)=>setClientName(e.target.value)}
          />

        </div>

        <div className="row">

          <div className="input-group">

            <label>Invoice Number</label>

            <input
              type="text"
              placeholder="INV-001"
              value={invoiceNumber}
              onChange={(e)=>setInvoiceNumber(e.target.value)}
            />

          </div>

          <div className="input-group">

            <label>Invoice Date</label>

            <input
              type="date"
              value={invoiceDate}
              onChange={(e)=>setInvoiceDate(e.target.value)}
            />

          </div>

        </div>

        <hr />

        <h2>Add Service</h2>

        <div className="input-group">

          <label>Service Name</label>

          <input
            type="text"
            placeholder="Enter Service Name"
            value={serviceName}
            onChange={(e)=>setServiceName(e.target.value)}
          />

        </div>

        <div className="row">

          <div className="input-group">

            <label>Quantity</label>

            <input
              type="number"
              placeholder="0"
              value={quantity}
              onChange={(e)=>setQuantity(e.target.value)}
            />

          </div>

          <div className="input-group">

            <label>Price</label>

            <input
              type="number"
              placeholder="0"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
            />

          </div>

        </div>

        <button
        className="add-btn"
        onClick={addService}
        >
        {editIndex !== null ? "Update Service" : "Add Service"}
        </button>

        <button
          className="save-btn"
          onClick={saveInvoice}
          disabled={loading}
        >

          {

            loading

              ? (id ? "Updating..." : "Saving...")

              : (id ? "Update Invoice" : "Save Invoice")

          }

        </button>

        <hr />

<h2>Added Services</h2>

<table className="service-table">

  <thead>

    <tr>

      <th>Service</th>

      <th>Qty</th>

      <th>Price</th>

      <th>Total</th>

      <th>Action</th>

    </tr>

  </thead>

  <tbody>

    {
      items.map((item,index)=>(

        <tr key={index}>

          <td>{item.serviceName}</td>

          <td>{item.quantity}</td>

          <td>₹{item.price}</td>

          <td>₹{item.quantity*item.price}</td>

          <td>

                <button
                onClick={()=>editService(index)}
                className="edit-btn"
                >

                Edit

                </button>

                <button
                onClick={()=>deleteService(index)}
                className="delete-btn"
                >

                Delete

                </button>

          </td>

        </tr>

      ))
    }

  </tbody>

</table>

      </div>

    </div>
    </>
  );
}

export default CreateInvoice;