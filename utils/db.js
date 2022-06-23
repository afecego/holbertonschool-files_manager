import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;
    this.status = false;
    this.client = MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (!err) {
        this.status = true;
        this.db = client.db(database);
        this.user = this.db.collection('users', (err) => {
          if (err) {
            throw err;
          }
        });
        this.file = this.db.collection('files', (err) => {
          if (err) {
            throw err;
          }
        });
      } else {
        this.status = false;
        throw err;
      }
    });
  }

  isAlive() {
    return this.status;
  }

  async nbUsers() {
    const use = await this.user.countDocuments();
    return use;
  }

  async nbFiles() {
    const fil = await this.file.countDocuments();
    return fil;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
