const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    id: { type: String, require: true },
    taskRef: { type: String },
    cause: { type: String },
    causedBy: { type: String },
    description: { type: String },
    issuedByUser: { type: String },
    issuedToOrganisation: { type: String },
    location: { type: String },
    statusChangeComments: { type: String },
    targetDate: { type: String },
    taskType: { type: String },
    taskStatus: { type: String },
    contractPackage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
