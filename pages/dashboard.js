import clientPromise from "../lib/mongodb";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
import styles from "../styles/dashboard.module.css"
import Layout from '../components/layout'
import { useState } from "react"

export default function Home( { stats, itemsdict } ) {
  stats = JSON.parse(stats)
  const [items, setItems] = useState(itemsdict)
  const [tokens, setTokens] = useState(stats['Tokens'])
  const [msg, setMsg] = useState("")
  const shop = {"Nokia": 1, "iPhone": 3, "Ipad": 6, "Laptop": 10}
  function buyItem(itemName){
    fetch('/api/buyitem', {
      method: 'POST',
      body: JSON.stringify({"item": itemName}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
       .then((response) => response.json())
       .then((data) => {
        if (data['type'] == "Success"){
          setTokens(data.tokenAmount)
          const oldCount = items[itemName] || 0
          let copiedItems = {...items};
          copiedItems[itemName] = oldCount + 1
          setItems( items => ({
              ...copiedItems
            }));
          setMsg("")
        } else {
          setMsg(data.data)
        }
       })
       .catch((err) => {
          console.log(err.message);
       });
  }
  return (
    <Layout>
        <h4>Signed in as <strong>{stats['Username']}</strong></h4>
        <p>Tokens: <strong>{tokens}</strong></p>
        {msg != "" ? 
        <p className="red">{msg}</p>
        : 
        <></>}
        <h2>Shop</h2>
        <div className={styles.items}>
          {
            Object.keys(shop).map((key, index) => ( 
              <div className={styles.item}>
                <h3>{key}</h3>
                <p>Price: <strong>{shop[key]}</strong></p>
                <span className={styles.amount}>{items[key] || 0}</span>
                <button className={styles.buybutton} onClick={() => buyItem(key)}>Buy {key}</button>
              </div>
            ))
          }
        </div><br/>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const userid = session.user.image.replace("https://avatars.githubusercontent.com/u/", "").replace("?v=4", "")
  const resp = await fetch(
    `https://api.github.com/user/${userid}`
  );
  const data = await resp.json();
  const username = data['login']
  const client = await clientPromise;
  const db = client.db("Logs");
  const users = await db.collection("Users").find({"Username": username}).toArray();
  var stats = {}
  if (users.length == 0){
    stats = {"Username": username, "Tokens": 0}
  } else {
    stats = users[0]
  }
  const itemsdict = stats["Items"] || {}
  stats = JSON.stringify(stats)
  return {
    props: {
      stats,
      itemsdict
    },
  }
}
