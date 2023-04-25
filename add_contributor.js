const uri = process.env.MONGODB_URI

const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

async function run() {
  try {
    await client.connect();
    await client.db("Logs").collection("Users").insertOne({"Username": "Hello"})
    console.log("added user")
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
