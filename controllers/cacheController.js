const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });
const keys = require('../config/keys');

const client = redis.createClient(keys.REDISURL);

client.hget = util.promisify(client.hget);
const { exec } = mongoose.Query.prototype;

// to make query cacheable
mongoose.Query.prototype.cache = function(options = {}) {
  //'this' here is query instant
  this._cache = true;
  this._hashKeyToUse = JSON.stringify(options.key || '');

  // to make it chainable
  return this;
};

mongoose.Query.prototype.exec = async function() {
  if (!this._cache) return exec.apply(this, arguments);

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  // See if we have a value for 'key' in redis
  const cacheValue = await client.hget(this._hashKeyToUse, key);

  // If we do, return that
  if (cacheValue) {
    console.log('found in cashed!');
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }

  console.log('Saved to cashed!');

  // Otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, arguments);

  client.hset(this._hashKeyToUse, key, JSON.stringify(result), 'EX', 10);

  return result;
};

module.exports = {
  clearHash(_hashKeyToUse) {
    client.del(JSON.stringify(_hashKeyToUse));
  }
};
