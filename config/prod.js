module.exports = {
  DATABASEURL: process.env.DATABASEURL,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  REDISURL: { host: 'redis-server', port: 6379 }
};
