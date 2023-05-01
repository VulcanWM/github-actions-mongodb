import Head from 'next/head';

export const siteTitle = "GitHub Actions MongoDB";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="description"
          content="demo of Github Actions with MongoDB"
        />
        <meta
          property="og:image"
          content="/logo.png"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:url" content="https://github-actions-mongodb.vercel.app/" />
        <meta property="og:site_name" content="GitHub Actions MongoDB" />
        <meta name="robots" content="index, follow"/>
        <meta property="og:type" content="Website" />
        <title>{siteTitle}</title>
      </Head>
      <main>{children}</main>
    </div>
  );
}