import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./ViewInvoice.css";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function ViewInvoice() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {

    try {

      const response = await API.get(`/invoice/${id}`);

      setInvoice(response.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load invoice");

    }

  };

  const downloadPDF = () => {

  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text("Invoice", 85, y);

  y += 20;

  doc.setFontSize(12);

  doc.text(`Company : ${invoice.companyName}`,20,y);

  y += 10;

  doc.text(`Client : ${invoice.clientName}`,20,y);

  y += 10;

  doc.text(`Invoice No : ${invoice.invoiceNumber}`,20,y);

  y += 10;

  doc.text(`Date : ${invoice.invoiceDate}`,20,y);

  y += 20;

  doc.text("Service",20,y);
  doc.text("Qty",90,y);
  doc.text("Price",120,y);
  doc.text("Total",160,y);

  y += 10;

  invoice.items.forEach((item)=>{

    doc.text(item.serviceName,20,y);
    doc.text(item.quantity.toString(),90,y);
    doc.text(item.price.toString(),120,y);
    doc.text((item.quantity*item.price).toString(),160,y);

    y += 10;

  });

  y += 15;

  const grandTotal = invoice.items.reduce(

    (sum,item)=>sum+(item.quantity*item.price),

    0

  );

  doc.setFontSize(14);

  doc.text(`Grand Total : ₹${grandTotal}`,20,y);

  doc.save(`${invoice.invoiceNumber}.pdf`);

};

  if (!invoice) {
    return <h2>Loading...</h2>;
  }

  return (
    <>

<Navbar />

<div className="view-container">

<div className="view-card">

<h1>Invoice Details</h1>

<div className="info-grid">

<div>

<label>Company Name</label>

<p>{invoice.companyName}</p>

</div>

<div>

<label>Client Name</label>

<p>{invoice.clientName}</p>

</div>

<div>

<label>Invoice Number</label>

<p>{invoice.invoiceNumber}</p>

</div>

<div>

<label>Invoice Date</label>

<p>{invoice.invoiceDate}</p>

</div>

</div>

<h2>Services</h2>

<table className="view-table">

<thead>

<tr>

<th>Service</th>

<th>Qty</th>

<th>Price</th>

<th>Total</th>

</tr>

</thead>

<tbody>

{
invoice.items.map((item,index)=>(

<tr key={index}>

<td>{item.serviceName}</td>

<td>{item.quantity}</td>

<td>₹{item.price}</td>

<td>₹{item.quantity*item.price}</td>

</tr>

))
}

</tbody>

</table>

<h2 className="grand-total">

Grand Total :
₹{

invoice.items.reduce(

(total,item)=>

total+(item.quantity*item.price),

0

)

}

</h2>

<div className="btn-group">

<button
className="pdf-btn"
onClick={downloadPDF}
>

Download PDF

</button>

<button
className="back-btn"
onClick={()=>navigate("/history")}
>

Back

</button>

</div>

</div>

</div>
</>

);

}

export default ViewInvoice;