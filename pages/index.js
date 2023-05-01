import Head from "next/head";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
import { signIn } from "next-auth/react";
import Layout from '../components/layout'

export default function Home( ) {
  return (
      <Layout>
        <p><strong>Signin to view your dashboard!</strong></p>
        <p>Not signed in</p>
        <br />
        <button className="thinbutton" onClick={() => signIn()}>Sign in</button>
      </Layout>
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
