const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const Task = require('./models/taskModel');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION: Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const keys = require('./config/keys');
const app = require('./app');

console.log(process.env.NODE_ENV);

const httpServer = http.createServer(app);
const socket = socketio(httpServer);

const DB = keys.DATABASEURL.replace('<PASSWORD>', keys.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection succesfull!'));

// catch database change event and inform all connected client
Task.watch().on('change', () => {
  console.log('Something changed in DB!');
  if (socket.broadcast) socket.broadcast.emit('#UPDATE');
});

const port = process.env.PORT || 3000;
const server = httpServer.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLER REJECTION: Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
