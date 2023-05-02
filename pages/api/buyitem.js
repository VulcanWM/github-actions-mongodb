import clientPromise from "../../lib/mongodb";
import { authOptions } from './auth/[...nextauth]';
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  const client = await clientPromise;
  const db = client.db("Logs");
  if (req.method == "GET"){
    res.redirect("/")
  } else if (req.method == 'POST') {
    if (!session) {
      res.json({ status: 200, data: "Not logged in", type: "Error" });
      return;
    }
    const userid = session.user.image.replace("https://avatars.githubusercontent.com/u/", "").replace("?v=4", "")
    const resp = await fetch(
      `https://api.github.com/user/${userid}`
    );
    const data = await resp.json();
    const username = data['login']
    const item = req.body['item']
    const shop = {"Nokia": 1, "iPhone": 3, "Ipad": 6, "Laptop": 10}
    if (Object.keys(shop).includes(item) == false){
        res.json({ status: 200, data: "Not real item", type: "Error" });
        return;
    }
    const users = await db.collection("Users").find({"Username": username}).toArray();
    var stats = {}
    if (users.length == 0){
        stats = {"Username": username, "Tokens": 0}
    } else {
        stats = users[0]
    }
    if (stats['Tokens'] < shop[item]){
        res.json({ status: 200, data: "You don't have enough money", type: "Error" });
        return;
    } 
    const itemsdict = stats["Items"] || {}
    const itemcount = itemsdict[item] || 0
    itemsdict[item] = itemcount + 1
    stats['Items'] = itemsdict
    stats['Tokens'] -= shop[item]
    await db.collection("Users").deleteOne({"Username": username})
    await db.collection("Users").insertOne(stats);
    res.json({ status: 200, data: "Bought item", type: "Success", tokenAmount: stats['Tokens'] });
  }
}