const dotenv = require("dotenv").config();
const { MongoClient } = require("mongodb");
const fs = require("fs").promises; // Use promises API for fs
const path = require("path");

const SEEDS_DIR = path.join(__dirname, "_seeds");
const MONGO_URL = process.env.MONGO_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

// This primes our database with our _seed data
async function loadData(filename, collectionName, schema = false) {
  const client = new MongoClient(MONGO_URL);

  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(collectionName);

    // Drop the collection if it exists
    try {
      await collection.drop();
    } catch (err) {
      // Ignore error if collection does not exist
    }

    // Load data from JSON file asynchronously
    const data = JSON.parse(await fs.readFile(path.join(SEEDS_DIR, filename), "utf8"));

    await collection.insertMany(data);

    if (schema) {
      // TODO: Add schema validation logic here (you can use packages like mongoose for schema validation)
    }

    if (collectionName === "projects") {
      await collection.createIndex({ id: 1 }, { unique: true });
    }
    if (collectionName === "users") {
      await collection.createIndex({ appuserId: 1, projectId: 1 });
    }
    if (collectionName === "devices") {
      await collection.createIndex({ serialNumber: 1, deviceId: 1, projectId: 1 });
    }

    console.log(`💾 Loaded data into ${collectionName}`);
  } catch (err) {
    console.error(`❌ Error loading data into ${collectionName}:`, err.message);
  } finally {
    await client.close();
  }
}

(async () => {
  try {
    await loadData("project.json", "projects");
    await loadData("user.json", "users");
    await loadData("device.json", "devices");
    console.log("✅ Database initialized!");
  } catch (err) {
    console.error("Error initializing database:", err.message);
  }
})();
