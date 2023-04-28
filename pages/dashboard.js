import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home( { stats } ) {
  stats = JSON.parse(stats)
  return (
    <div>
      <Head>
        <title>GitHub Actions MongoDB</title>
        <meta name="description" content="demo of Github Actions with MongoDB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <>
        <div>
        <h4>Signed in as {stats['Username']}</h4>
        <p>Tokens: {stats['Tokens']}</p>
        <h2>Shop</h2>
        <button onClick={() => signOut()}>Sign out</button>
        </div>
    </>
    </div>
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
  const res = await fetch(
    `https://api.github.com/user/${userid}`
  );
  const data = await res.json();
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
