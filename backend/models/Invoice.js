const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    invoiceDate: {
      type: String,
      required: true,
    },

    items: [
      {
        serviceName: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Invoice", invoiceSchema);