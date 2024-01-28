import { MongoClient } from 'mongodb';

const connectMongo = async () => {
  try {
    console.log("Connecting to MongoDB -_-")
    const client = new MongoClient(process.env.MONGODB_URI as string)
    await client.connect()
    console.log("Fully Connected to MongoDB :D")
    return client
  } catch (error) {
    console.log({
      message: "Failed to connect on MongoDB :(",
      error,
    })
  }
}

export default connectMongo;