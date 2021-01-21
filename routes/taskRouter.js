const express = require('express');
const taskController = require('./../controllers/taskController');
const { clearHash } = require('../controllers/cacheController');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

const cleanCache = catchAsync(async (req, res, next) => {
  await next();

  clearHash('');
});

router
  .route('/')
  .get(taskController.getTasks)
  .post(cleanCache, taskController.createTask);

router
  .route('/:id')
  .get(taskController.getTask)
  .patch(cleanCache, taskController.updateTask)
  .delete(cleanCache, taskController.deleteTask);

module.exports = router;
