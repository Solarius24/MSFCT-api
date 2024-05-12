const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProcessSchema = new Schema({
  columns: { type: Array },
  title: { type: String },
  location: {
    id: { type: String },
    locationName: { type: String },
    locationStatus: { type: Object },
    createdDate: { type: String },
  },
});

module.exports = mongoose.model("Process", ProcessSchema);
