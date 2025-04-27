import { MongoClient } from 'mongodb';


const uri = process.env.MONGO_URI || "mongodb+srv://shuklaharsh5840:shuklah5840@cluster0.w3mev.mongodb.net/green";
const options = {};


let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGO_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the connection
  // Add type definition for global to handle clientPromise safely
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, create a new connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
