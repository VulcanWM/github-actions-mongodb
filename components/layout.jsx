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
      <hr/>
      <p>This website has been made for the <a href="https://dev.to/devteam/announcing-the-github-dev-2023-hackathon-4ocn" target="_blank">GitHub + DEV Hackathon</a>.</p>
      <p>It is an example of how you can connect MongoDB to GitHub Actions and use it as a reward system for a repo's contributors.</p>
      <p>Contribute to <a href="https://github.com/VulcanWM/github-actions-mongodb/blob/main/CONTRIBUTING.md" target="_blank">the GitHub repo</a> to earn some tokens and see this template in action!</p>
    </div>
  );
}