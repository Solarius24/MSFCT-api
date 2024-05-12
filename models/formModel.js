const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FormSchema = new Schema(
  {
    id: { type: String, require: true },
    formTitle: { type: String },
    documentRef: { type: String },
    createdDate: { type: String },
    status: { type: String },
    formType: { type: String },
    details: { type: String },
    location: { type: String },
    expiryDate: { type: String },
    signatureDate: { type: String },
    signature: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", FormSchema);
