const sha1 = require('sha1');
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
  const filteredDocs = await dbClient.user.insertOne({ email, password: sha });
  const result = {
    id: filteredDocs.insertedId,
    email,
  };
  return res.status(201).json(result);
};
