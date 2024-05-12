const express = require("express");
const {
  getForms,
  getForm,
  createForm,
  deleteForm,
  updateForm,
  // filterForms,
} = require("../controllers/formController");
const {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

const {
  getFormsSchedule,
  getFormSchedule,
  createFormSchedule,
  deleteFormSchedule,
  updateFormSchedule,
} = require("../controllers/formScheduleController");

const {
  getUserTabs,
  createUserTabs,
  deleteUserTabs,
  updateUserTabs,
  updateUserTabName,
  updateWidgetList,
  deleteWidget,
  updateFormListOfColumnToDisplay,
  updateTaskListOfColumnToDisplay,
} = require("../controllers/userController");

const {
  getProcesses,
  createLocation,
  updateLocationStatus,
} = require("../controllers/processControler");

const router = express.Router();

// GET all tasks/forms/processes
router.get("/forms", getForms);
router.get("/forms-schedule", getFormsSchedule);
router.get("/tasks", getTasks);
router.get("/processes", getProcesses);

// GET a single task/form
router.get("/forms/:id", getForm);
router.get("/forms-schedule/:id", getFormSchedule);
router.get("/tasks/:id", getTask);
router.get("/userData", getUserTabs);

//FILTER FORMS
// router.get("/forms/filter", filterForms);

// POST a new task/form/location

router.post("/forms", createForm);
router.post("/forms-schedule", createFormSchedule);
router.post("/tasks", createTask);
router.post("/userData", createUserTabs);

// DELETE task/form/userdata
router.delete("/forms", deleteForm);
router.delete("/forms-schedule", deleteFormSchedule);
router.delete("/tasks", deleteTask);
router.delete("/userData/:id", deleteUserTabs);
router.delete("/userDataWidget/:id", deleteWidget);

// UPDATE task/form/userData
router.patch("/forms/:id", updateForm);
router.patch("/forms-schedule/:id", updateFormSchedule);
router.patch("/tasks/:id", updateTask);
router.patch("/userData", updateUserTabs);

//UPDATE LOCACTION STATUS
router.patch("/updateLocationStatus", updateLocationStatus);

//update TAB NAME
router.patch("/userDataTabName", updateUserTabName);

//ADD WIDGET TO WIDGET LIST
router.patch("/userData/:id", updateWidgetList);

//ADD LIST OF COLUMNS TO DISPLAY ON FORM PAGE
router.patch("/updateFormListOfColumns", updateFormListOfColumnToDisplay);
//ADD LIST OF COLUMNS TO DISPLAY ON TASK PAGE
router.patch("/updateTaskListOfColumns", updateTaskListOfColumnToDisplay);
//ADD NEW LOCATION TO LOCATION ARRAY IN DATANASE
router.patch("/addLocation", createLocation);

module.exports = router;
