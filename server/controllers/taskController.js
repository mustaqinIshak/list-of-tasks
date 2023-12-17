const taskService = require("../services/taskService");
const { body, param,validationResult } = require('express-validator')

const validate = (method) => {
  switch (method) {
    case 'getAllTasks': {
     return [ 
        body('listPerPage', "listPerPage doesn't exists").exists().notEmpty(),
        body('listPerPage', "listPerPage must be integer").isInt(),
        body('page', "page doesn't exist").exists().notEmpty(),
        body('page', "page must be integer").isInt(),
       ]   
    }
    case 'getOneTask' : {
      return param('taskId', "idTask dosen't exist").exists()
      
    }
    case 'postTask' : {
      return [
        body('name', "name doesn't exist").exists().notEmpty(),
        body('name', "name must be string").isString(),
        body('description', "description doesn't exists").exists().notEmpty(),
        body('description', "description must be string").isString(),
        body('dueDate', "dueDate doesn't exists").exists().notEmpty(),
        body('dueDate', "dueDate must be date").isDate()
      ]
    } 
    case 'createTask' : {
      return [
        body('name', "name doesn't exist").exists().notEmpty(),
        body('name', "name must be string").isString(),
        body('description', "description doesn't exists").exists().notEmpty(),
        body('description', "description must be string").isString(),
        body('dueDate', "dueDate doesn't exists").exists().notEmpty(),
        body('dueDate', "dueDate must be date").isDate()
      ]
    } 
    case 'updateTask' : {
      return [
        param('taskId', "idTask dosen't exist").exists().notEmpty(),
        body('name', "name doesn't exist").exists().notEmpty(),
        body('name', "name must be string").isString(),
        body('description', "description doesn't exists").exists().notEmpty(),
        body('description', "description must be string").isString(),
        body('dueDate', "dueDate doesn't exists").exists().notEmpty(),
        body('dueDate', "dueDate must be date").isDate().notEmpty()
      ]
    } 
  }
}

const getAllTasks = async (req, res, next) => {
  try {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      throw {
        statusCode: 422,
        message: errors.array()
      }
       ;
    } 
    const {listPerPage, page, search} = req.body;
    const allTasks = await taskService.getAllTask(page, listPerPage, search)
    res.json(allTasks);
  }catch(err) {
    return next(err)
  }
};
  
const getOneTask = async (req, res, next) => {
  try {
    const {taskId} = req.params
    console.log("masuk")
    if(!taskId) {
       throw {
        statusCode: 422,
        message: "taskId doesn't exist"
      };
    }
    const task = await taskService.getOneTask(taskId)
    res.json(task);
    
  } catch (error) {
    return next(error)
  }
};

const createNewTask = async (req, res, next) => {
  try {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      throw {
        statusCode: 422,
        message: errors.array()
      }
       ;
    } 
    const {name, description, dueDate} = req.body
    const payload = {
      name,
      description,
      dueDate
    }
    const createTask = await taskService.createNewTask(payload)
    res.json(createTask)
  } catch (error) {
    return next(error) 
  }
};

const updateOneTask = async (req, res, next) => {
  try {
    const {taskId} = req.params
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
      throw {
        statusCode: 422,
        message: errors.array()
      }
       ;
    } else if(!taskId) {
      throw {
       statusCode: 422,
       message: "taskId doesn't exist"
     };
   }
    const {name, description, dueDate} = req.body
    const payload = {
      name,
      description,
      dueDate
    }
    const updateTask = taskService.updateOneTask(taskId, payload)
    res.json(updateTask)
  } catch (error) {
    return next(error) 
  }
};

const deleteOneTask = (req, res) => {
  try {   
    const {taskId} = req.params
    if(!taskId) {
      throw {
       statusCode: 422,
       message: "taskId doesn't exist"
     };
   }
    const deleteTask  = taskService.deleteOneTask(taskId)
    res.send(deleteTask);
  } catch (error) {
    return next(error) 
  }
};

module.exports = {
  validate,
  getAllTasks,
  getOneTask,
  createNewTask,
  updateOneTask,
  deleteOneTask,
};