const mongoose = require("mongoose");
const FormSchedule = require("../models/formScheduleModel");

// get all forms schedule
const getFormsSchedule = async (req, res) => {
  const formsSchedule = await FormSchedule.find({}).sort({ createdAt: -1 });

  res.status(200).json(formsSchedule);
};

// get a single form schedule
const getFormSchedule = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such form" });
  }

  const formSchedule = await FormSchedule.findById(id);

  if (!formSchedule) {
    return res.status(404).json({ error: "No such form" });
  }

  res.status(200).json(formSchedule);
};

// create a new form schedule
const createFormSchedule = async (req, res) => {
  const {
    id,
    type,
    template,
    description,
    location,
    issuedByOrganisation,
    startDate,
    repeat,
    issuedBy,
  } = req.body;
  // add to the database
  try {
    const formSchedule = await FormSchedule.create({
      id,
      type,
      template,
      description,
      location,
      issuedByOrganisation,
      startDate,
      repeat,
      issuedBy,
    });
    res.status(200).json(formSchedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a form schedule
const deleteFormSchedule = async (req, res) => {
  const listOfFormsScheduleToDelete = req.body;
  const formSchedule = await FormSchedule.deleteMany({
    id: { $in: listOfFormsScheduleToDelete },
  });

  if (!formSchedule) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(formSchedule);
};

// update a form schedule
const updateFormSchedule = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such form" });
  }

  const formSchedule = await FormSchedule.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!formSchedule) {
    return res.status(400).json({ error: "No such form" });
  }

  res.status(200).json(formSchedule);
};

module.exports = {
  getFormsSchedule,
  getFormSchedule,
  createFormSchedule,
  deleteFormSchedule,
  updateFormSchedule,
};
