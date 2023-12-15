const express = require("express");
const router = express.Router();
const tasksController = require("../../controllers/taskController");

router.post("/", tasksController.validate('getAllTasks'),tasksController.getAllTasks);

router.get("/:taskId", tasksController.getOneTask);

router.post("/", tasksController.createNewTask);

router.patch("/:taskId", tasksController.updateOneTask);

router.delete("/:taskId", tasksController.deleteOneTask);

module.exports = router;