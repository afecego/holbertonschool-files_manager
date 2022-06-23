const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

exports.getStatus = (req, res) => {
  res.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
};

exports.getStats = async (req, res) => {
  res.status(200).json({ users: await dbClient.nbUsers(), files: await dbClient.nbFiles() });
};
