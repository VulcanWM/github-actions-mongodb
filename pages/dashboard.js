import Head from "next/head";
import Image from "next/image";
// import { authOptions } from 'pages/api/auth/[...nextauth]'
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home( { username, stats } ) {
  return (
    <div>
      <Head>
        <title>GitHub Actions MongoDB</title>
        <meta name="description" content="demo of Github Actions with MongoDB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <>
        <div>
        <h4>Signed in as {username}</h4>
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
  return {
    props: {
      username: session.user.name,
      stats: {}
    },
  }
}