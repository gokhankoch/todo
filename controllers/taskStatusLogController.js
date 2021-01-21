const TaskStatusLog = require('./../models/taskStatusLogModel');
const factory = require('./handlerFactory');

exports.getTaskStatusLogAll = factory.getAll(TaskStatusLog);
exports.getTaskStatusLog = factory.getOne(TaskStatusLog);

