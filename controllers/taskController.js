const mongoose = require("mongoose");
const Task = require("../models/taskModel");

// get all forms
const getTasks = async (req, res) => {
  const tasks = await Task.find({}).sort({ createdAt: -1 });

  res.status(200).json(tasks);
};

// get a single form
const getTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such form" });
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({ error: "No such form" });
  }

  res.status(200).json(form);
};

// create a new form
const createTask = async (req, res) => {
  const task = ({
    id,
    taskRef,
    cause,
    causedBy,
    description,
    issuedByUser,
    issuedToOrganisation,
    location,
    contractPackage,
    taskStatus,
    statusChangeComments,
    targetDate,
    taskType,
  } = req.body);
  // add to the database
  try {
    const task = await Task.create({
      id,
      taskRef,
      cause,
      causedBy,
      description,
      issuedByUser,
      issuedToOrganisation,
      location,
      contractPackage,
      taskStatus,
      statusChangeComments,
      targetDate,
      taskType,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a form
const deleteTask = async (req, res) => {
  const listOfTasksToDelete = req.body;
  const task = await Task.deleteMany({ id: { $in: listOfTasksToDelete } });

  if (!task) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(task);
};

// update a form
const updateTask = async (req, res) => {
  const { id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ error: "No such form" });
  // }

  const task = await Task.findOneAndUpdate(
    // { _id: id },
    { id: id },

    {
      ...req.body,
    }
  );

  if (!task) {
    return res.status(400).json({ error: "No such form" });
  }

  res.status(200).json(task);
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
