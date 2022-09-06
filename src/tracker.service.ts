import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const { COLLECTION, DB_NAME, MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);
client.connect();

const getDB = async (db: string) => {
  if (client && client.isConnected()) {
    return client.db(db);
  }

  return null;
};

export default class TrackerService {
  constructor() {}

  static async updateTracker(tracker: any[]) {
    const db = await getDB(DB_NAME);
    if (db) {
      return (await db.collection(COLLECTION).insertMany(tracker)).ops;
    }
  }
}
