const taskService = require("../services/taskService");
const { body, validationResult } = require('express-validator')

const validate = (method) => {
  switch (method) {
    case 'getAllTasks': {
     return [ 
        body('listPerPage', "listPerPage doesn't exists").exists(),
        body('listPerPage', "listPerPage must be integer").isInt(),
        body('page', "page doesn't exist").exists(),
        body('page', "page must be integer").isInt(),
       ]   
    }
    case 'postTask' : {
      return [
        body('name', "name doesn't exist").exists(),
        body('name', "name must be string").isString(),
        body('description', "description doesn't exists").exists(),
        body('description', "description must be string").isString(),
        body('dueDate', "dueDate doesn't exists").exists(),
        body('dueDate', "dueDate must be date").isDate()
      ]
    } 
  }
}

const getAllTasks = async (req, res, next) => {
  try {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    } 
    const {listPerPage, page} = req.body;
    const allTasks = await taskService.getAllTask(page, listPerPage)
    res.json(allTasks);
  }catch(err) {
    return next(err)
  }
};
  
const getOneTask = (req, res) => {
  const task = taskService.getOneTask()
  res.send("Get an existing Task");
};

const createNewTask = (req, res) => {
  const createTask = taskService.createNewTask()
  res.send("Create a new Task");
};

const updateOneTask = (req, res) => {
  const updateTask = taskService.updateOneTask()
  res.send("Update an existing Task");
};

const deleteOneTask = (req, res) => {
  const deleteTask  = taskService.deleteOneTask()
  res.send("Delete an existing Task");
};

module.exports = {
  validate,
  getAllTasks,
  getOneTask,
  createNewTask,
  updateOneTask,
  deleteOneTask,
};