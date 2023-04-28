const uri = process.env.MONGODB_URI
const username = process.env.USERNAME

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
    const users = await client.db("Logs").collection("Users").find({"Username": username}).toArray();
    if (users.length == 0){
        await client.db("Logs").collection("Users").insertOne(
            {
                "Username": username,
                "Tokens": 1,
            }
        )
        console.log("added user")
    } else {
        await client.db("Logs").collection("Users").deleteOne({"Username": username})
        await client.db("Logs").collection("Users").insertOne(
            {
                "Username": username,
                "Tokens": users[0]['Tokens'] + 1,
            }
        )
        console.log("updated user")
    }
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
