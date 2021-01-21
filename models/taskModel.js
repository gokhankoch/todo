const mongoose = require('mongoose');
const TaskStatusLog = require('./taskStatusLogModel');

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, 'Task can not be empty!'],
      unique: true,
      maxlength: [100, 'A task have less or equal then 100 characters'],
      minlength: [5, 'A task must have more or equal then 5 characters']
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: String
    },
    user: {
      type: String
    },
    lastUpdate: Date
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

taskSchema.index({ user: 1 });

taskSchema.post(/^findOneAnd/, async function(doc) {
  await TaskStatusLog.create({
    status: doc.status,
    task: doc.id
  });
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
