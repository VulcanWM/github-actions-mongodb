import Head from "next/head";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home( ) {
  return (
    <div>
      <Head>
        <title>GitHub Actions MongoDB</title>
        <meta name="description" content="demo of Github Actions with MongoDB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <p><strong>Signin to view your dashboard!</strong></p>
        <p>Not signed in</p>
        <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {
    },
  }
}
