const mongoose = require("mongoose");
const User = require("../models/userModel");
const { query } = require("express");

// get a single form
const getUserTabs = async (req, res) => {
  const { id } = req.query;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "No such form" });
  // }

  const user = await User.findOne({ id: id });

  if (!user) {
    return res.status(404).json({ error: "No such form" });
  }

  res.status(200).json(user);
};

// create a new TAB
const createUserTabs = async (req, res) => {
  const { tabName } = req.body;
  // add TAB to the database
  try {
    const tab = await User.create({
      tabName,
      listOfWidgets,
    });
    res.status(200).json(tab);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a tab
const deleteUserTabs = async (req, res) => {
  const { tabId } = req.body;
  const tab = await User.updateMany(
    {},
    {
      $pull: {
        listOfTabs: { _id: tabId },
      },
    }
  );

  if (!tab) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(tab);
};

// update a tab
const updateUserTabName = async (req, res) => {
  const { tabId } = req.body;
  const { tabName } = req.body;
  const tab = await User.findOneAndUpdate(
    {},
    { $set: { "listOfTabs.$[elem].tabName": tabName } },
    { arrayFilters: [{ "elem._id": tabId }] }
  );
  if (!tab) {
    return res.status(400).json({ error: "No such form" });
  }

  res.status(200).json(tab);
};

const updateUserTabs = async (req, res) => {
  const { id } = req.query;
  // const { id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ error: "No such form" });
  // }
  const tab = await User.findOneAndUpdate(
    { id: id },
    { $addToSet: { listOfTabs: req.body } }
  );

  if (!tab) {
    return res.status(400).json({ error: "No such form" });
  }

  res.status(200).json(tab);
};

//ADD WIDGET TO THE LIST OF WIDGETS
const updateWidgetList = async (req, res) => {
  const { widgetName, widgetType } = req.body;
  const { tabId } = req.body;

  const widgetList = await User.updateOne(
    {},

    {
      $addToSet: {
        "listOfTabs.$[elem].listOfWidgets": {
          widgetName: widgetName,
          widgetType: widgetType,
        },
      },
    },
    { arrayFilters: [{ "elem._id": tabId }] }
  );

  if (!widgetList) {
    return res.status(400).json({ error: "No such wisget list" });
  }

  res.status(200).json(widgetList);
};

const deleteWidget = async (req, res) => {
  const { widgetId, tabId } = req.body;
  const widget = await User.updateOne(
    {},

    {
      $pull: {
        "listOfTabs.$[elem].listOfWidgets": {
          _id: widgetId,
        },
      },
    },
    { arrayFilters: [{ "elem._id": tabId }] }
  );

  if (!widget) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(widget);
};

const updateFormListOfColumnToDisplay = async (req, res) => {
  const data = req.body;

  const listOfColumnToDisplay = await User.updateOne(
    {},
    { $set: { "listOfColumnToDisplay.form": data } }
  );

  if (!listOfColumnToDisplay) {
    return res.status(400).json({ error: "Data Load Error" });
  }

  res.status(200).json(listOfColumnToDisplay);
};
const updateTaskListOfColumnToDisplay = async (req, res) => {
  const data = req.body;

  const listOfColumnToDisplay = await User.updateOne(
    {},
    { $set: { "listOfColumnToDisplay.task": data } }
  );

  if (!listOfColumnToDisplay) {
    return res.status(400).json({ error: "Data Load Error" });
  }

  res.status(200).json(listOfColumnToDisplay);
};

module.exports = {
  getUserTabs,
  createUserTabs,
  deleteUserTabs,
  updateUserTabs,
  updateUserTabName,
  updateWidgetList,
  deleteWidget,
  updateFormListOfColumnToDisplay,
  updateTaskListOfColumnToDisplay,
};
