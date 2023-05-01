import clientPromise from "../lib/mongodb";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
import { signOut } from "next-auth/react";
import styles from "../styles/dashboard.module.css"
import Layout from '../components/layout'

export default function Home( { stats, items } ) {
  stats = JSON.parse(stats)
  console.log(items)
  const shop = {"Nokia": 1, "iPhone": 3, "Ipad": 6, "Laptop": 10}
  return (
    <Layout>
        <h4>Signed in as <strong>{stats['Username']}</strong></h4>
        <p>Tokens: <strong>{stats['Tokens']}</strong></p>
        <h2>Shop</h2>
        <div className={styles.items}>
          {
            Object.keys(shop).map((key, index) => ( 
              <div className={styles.item}>
                <h3>{key}</h3>
                <p>Price: <strong>{shop[key]}</strong></p>
                <p>Amount: <strong>{items[key] || 0}</strong></p>
                <button>Buy {key}</button>
              </div>
            ))
          }
        </div><br/>
        <button className="thinbutton" onClick={() => signOut()}>Sign out</button>
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
  const items = stats["Items"] || {}
  stats = JSON.stringify(stats)
  return {
    props: {
      stats,
      items
    },
  }
}
