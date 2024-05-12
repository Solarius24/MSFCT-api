const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FormScheduleSchema = new Schema(
  {
    id: { type: String, require: true },
    type: { type: String },
    template: { type: String },
    description: { type: String },
    location: { type: String },
    issuedByOrganisation: { type: String },
    startDate: { type: String },
    repeat: { type: String },
    issuedBy: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FormSchedule", FormScheduleSchema);
