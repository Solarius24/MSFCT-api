const { default: mongoose } = require("mongoose");
const Process = require("../models/processModel");

const getProcesses = async (req, res) => {
  const processes = await Process.find({}).sort({ createdAt: -1 });
  res.status(200).json(processes);
};

const createLocation = async (req, res) => {
  console.log(req.body);
  const { id } = req.query;

  const newLocation = await Process.findOneAndUpdate(
    { _id: id },
    {
      $addToSet: {
        location: req.body,
      },
    }
  );
  if (!newLocation) {
    return res.status(404).json({ error: "No such form" });
  }

  res.status(200).json(newLocation);
};

const updateLocationStatus = async (req, res) => {
  const { id } = req.query;
  console.log(req.body);
  const newStatus = await Process.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        location: req.body,
      },
    }
  );

  if (!newStatus) {
    return res.status(400).json({ error: "No such form" });
  }

  res.status(200).json(newStatus);
};

module.exports = {
  getProcesses,
  updateLocationStatus,
  createLocation,
};
