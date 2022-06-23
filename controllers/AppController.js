const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

exports.getStatus = (req, res) => {
  res.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
};

exports.getStats = (req, res) => {
  res.json({ users: dbClient.nbUsers(), files: dbClient.nbFiles() });
};
