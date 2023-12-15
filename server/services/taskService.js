const helper = require('../helpers/helpers')
const db = require('../database/db')

const getAllTask = async (page = 1, listPerPage = 10) => {
  try {
    const offset = helper.getOffset(page, listPerPage)
    const row = await db.query(`
      SELECT id, task_name, task_description, due_date 
      FROM task_information task_infomation LIMIT ${offset},${listPerPage}
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
  
const getOneTask = () => {
  return;
};

const createNewTask = () => {
  return;
};

const updateOneTask = () => {
  return;
};

const deleteOneTask = () => {
  return;
};

module.exports = {
  getAllTask,
  getOneTask,
  createNewTask,
  updateOneTask,
  deleteOneTask,
};