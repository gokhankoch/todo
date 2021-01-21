const mongoose = require('mongoose');
const Task = require('./taskModel');

const taskStatusLogSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: [true, 'stat can not be empty!']
    },    
    createAt: {
      type: Date,
      default: Date.now
    },
    task: {
      type: mongoose.Schema.ObjectId,
      ref: 'Task',
      required: [true, 'TaskStatusLog must belong to a task.']
    }  
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const TaskStatusLog = mongoose.model('TaskStatusLog', taskStatusLogSchema);

module.exports = TaskStatusLog;
