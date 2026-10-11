import "styles/App.styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "contexts/theme-context";
import '@fortawesome/fontawesome-svg-core/styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MAL — Software Engineer</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Software Engineer" />
        <meta
          name="keywords"
          content="Software Developer, Frontend Developer, Software Engineer, HTML, CSS, JavaScript, React, NextJS, Angular, NodeJS, SASS, Docker"
        />
        <link rel="icon" sizes="10" href="/logo.svg" />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
