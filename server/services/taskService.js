const helper = require('../helpers/helpers')
const db = require('../database/db')

const getAllTask = async (page = 1, listPerPage = 10, search) => {
  try {
    const offset = helper.getOffset(page, listPerPage)
    console.log(offset)
    let row = null
    if(search) {
      row = await db.query(`
      SELECT * FROM task_information as a WHERE a.task_name LIKE "%${search}%" OR a.task_description LIKE "%${search}%" OR a.due_date LIKE "%${search}%"  
      LIMIT ${offset},${listPerPage}
      `)
    } else {
      console.log('masuk')
      row = await db.query(`
        SELECT * FROM task_information LIMIT ${offset}, ${listPerPage}
      `)
    }
    const data = helper.emptyOrRows(row)
    const meta = {page} 
    return {
      data,
      meta
    }
  } catch(error) {
    throw error
  }
};
  
const getOneTask = async (taskId) => {
  try {
    const data = await db.query(`
      SELECT * FROM task_information WHERE id = ${taskId}
    `)
    console.log(data)
    if (data.length == 0) {
      throw {
        statusCode: 400,
        message: "task not found"
      };
    }
    return {
      data
    }
  } catch (error) {
    throw error
  }
};

const createNewTask = async (payload) => {
  try {
    const date = helper.dateTime();
    const insertTask = await db.query(`
      INSERT INTO task_information (task_name, task_description, due_date, created_at, updated_at)
      VALUES ("${payload.name}", "${payload.description}", "${payload.dueDate}", "${date}", "${date}")
    `)

    let message = 'Error in creating task';

    if (insertTask.affectedRows) {
      message = 'Task created successfully';
      return message
    } else {
      throw {
        statusCode: 500,
        message
      }
    }

  } catch (error) {
    throw error
  }
};

const updateOneTask = async (taskId, payload) => {
  try {
    const date = helper.dateTime();
    const insertTask = await db.query(`
      UPDATE task_information SET task_name = "${payload.name}", task_description = "${payload.description}", due_date = "${payload.dueDate}", updated_at = "${date}"
      WHERE id = ${taskId}
    `)

    let message = 'Error in update task';

    if (insertTask.affectedRows) {
      message = 'Task update successfully';
      return message
    } else {
      throw {
        statusCode: 500,
        message
      }
    }

  } catch (error) {
    throw error
  }
};

const deleteOneTask = async (taskId) => {
  try {
    const insertTask = await db.query(`
      DELETE FROM task_information WHERE id = ${taskId}
    `)

    let message = 'Error in delete task';

    if (insertTask.affectedRows) {
      message = 'Task delete successfully';
      return message
    } else {
      throw {
        statusCode: 500,
        message
      }
    }

  } catch (error) {
    throw error
  }
};

module.exports = {
  getAllTask,
  getOneTask,
  createNewTask,
  updateOneTask,
  deleteOneTask,
};