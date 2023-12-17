const express = require("express");
const router = express.Router();
const tasksController = require("../../controllers/taskController");

router.post("/getAll", tasksController.validate('getAllTasks'),tasksController.getAllTasks);

router.get("/getOne/:taskId",tasksController.getOneTask);

router.post("/create",tasksController.validate('createTask'), tasksController.createNewTask);

router.patch("/update/:taskId", tasksController.validate('updateTask'),tasksController.updateOneTask);

router.delete("/delete/:taskId", tasksController.deleteOneTask);

module.exports = router;