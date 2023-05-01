import clientPromise from "../lib/mongodb";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
import { signOut } from "next-auth/react";
import styles from "../styles/dashboard.module.css"
import Layout from '../components/layout'

export default function Home( { stats } ) {
  stats = JSON.parse(stats)
  return (
    <Layout>
        <h4>Signed in as {stats['Username']}</h4>
        <p>Tokens: {stats['Tokens']}</p>
        <h2>Shop</h2>
        <div className={styles.items}>
          <div className={styles.item}>
            <h3>Nokia</h3>
            <p>Price: <strong>1</strong></p>
            <button>Buy Nokia</button>
          </div>
          <div className={styles.item}>
            <h3>iPhone</h3>
            <p>Price: <strong>3</strong></p>
            <button>Buy iPhone</button>
          </div>
          <div className={styles.item}>
            <h3>Ipad</h3>
            <p>Price: <strong>6</strong></p>
            <button>Buy Ipad</button>
          </div>
          <div className={styles.item}>
            <h3>Laptop</h3>
            <p>Price: <strong>10</strong></p>
            <button>Buy Laptop</button>
          </div><br/>
        </div>
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
  stats = JSON.stringify(stats)
  return {
    props: {
      stats
    },
  }
}
