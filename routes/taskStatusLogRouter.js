const express = require('express');
const taskStatusLogController = require('./../controllers/taskStatusLogController');
const { clearHash } = require('../controllers/cacheController');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.route('/').get(taskStatusLogController.getTaskStatusLogAll);

router.route('/:id').get(taskStatusLogController.getTaskStatusLog);

module.exports = router;
