const sha1 = require('sha1');
const Queue = require('bull');
const dbClient = require('../utils/db');

exports.postNew = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Missing password' });
  }
  const emailTrue = await dbClient.user.findOne({ email });
  if (emailTrue) {
    return res.status(400).json({ error: 'Already exist' });
  }
  const sha = sha1(password);
  let insert;
  try {
    insert = await dbClient.user.insertOne({ email, password: sha });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  const UsQue = Queue('UsQue');
  UsQue.add({ userId: insert.insertedId });

  const result = {
    id: insert.insertedId,
    email,
  };
  return res.status(201).json(result);
};
