const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Invoice = require("./models/Invoice");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
  res.json({
    message: "Backend is Running",
    success: true,
  });
});

app.post("/invoice", async (req, res) => {
  try {

    const {
      clientName,
      companyName,
      invoiceNumber,
      invoiceDate,
      items,
    } = req.body;

    const invoice = new Invoice({
      clientName,
      companyName,
      invoiceNumber,
      invoiceDate,
      items,
    });

    await invoice.save();

    res.status(201).json(invoice);

  } catch (error) {
  res.status(500).json({
    message: error.message,
  });
}
});

app.get("/invoice", async (req, res) => {
  try {
    const invoices = await Invoice.find();

    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/invoice/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice Not Found",
      });
    }

    res.status(200).json(invoice);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.delete("/invoice/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice Not Found",
      });
    }

    res.json({
      message: "Invoice Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.put("/invoice/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice Not Found",
      });
    }

    res.json({
      message: "Invoice Updated Successfully",
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});