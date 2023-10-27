const { MongoClient, ServerApiVersion } = require("mongodb");
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

let db;

// Connect to the database and return the connected db instance
async function connectToDb() {
  if (db) return db; // if already connected, return the db instance

  const client = new MongoClient(MONGO_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  db = client.db(DATABASE_NAME);

  console.log("🛜 Successfully connected to MongoDB!");
  return db;
}

export default connectToDb;
