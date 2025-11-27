import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("❌ Missing MONGO_URI in .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Global variable to prevent creating many clients in dev mode
const globalWithMongo = global as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (process.env.NODE_ENV === "development") {
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getMongo() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB || "test"); // <- choose your DB
  return { client, db };
}
