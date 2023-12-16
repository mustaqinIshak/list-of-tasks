const helper = require('../helpers/helpers')
const db = require('../database/db')

const getAllTask = async (page = 1, listPerPage = 10) => {
  try {
    const offset = helper.getOffset(page, listPerPage)
    const row = await db.query(`
      SELECT * FROM task_information LIMIT ${offset},${listPerPage}
    `)

    const data = helper.emptyOrRows(row)
    const meta = {page} 
    return {
      data,
      meta
    }
  } catch(err) {
    throw err
  }
};
  
const getOneTask = async (taskId) => {
  try {
    const data = await db.query(`
      SELECT * FROM task_information WHERE id = ${taskId}
    `)

    return {
      data
    }
  } catch (error) {
    throw error
  }
};

const getSearchTask = async (key) => {
  try {
    const data = db.query(`
      SELECT * FROM task_information WHERE task_name LIKE ${key} OR task_description LIKE ${key} OR due_date LIKE ${key}  
    `)

    return {
      data
    }
  } catch (error) {
    throw error
  }
}

const createNewTask = async (payload) => {
  try {
    const insertTask = db.query(`

    `)
  } catch (error) {
    throw error
  }
};

const updateOneTask = (taskId, payload) => {
  return;
};

const deleteOneTask = (taskId, payload) => {
  return;
};

module.exports = {
  getAllTask,
  getOneTask,
  getSearchTask,
  createNewTask,
  updateOneTask,
  deleteOneTask,
};