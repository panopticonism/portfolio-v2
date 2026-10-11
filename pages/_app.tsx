import "styles/App.styles.css";
import type { AppProps } from "next/app";
import { Exo_2, Open_Sans, Syncopate } from "next/font/google";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "contexts/theme-context";
import '@fortawesome/fontawesome-svg-core/styles.css'

// Self-hosted by next/font: no request to Google at page load, and fallback
// metrics are adjusted so text doesn't jump when the fonts arrive.
const headingFont = Syncopate({ subsets: ["latin"], weight: ["400", "700"] });
const bodyFont = Open_Sans({ subsets: ["latin"], style: ["normal", "italic"] });
const buttonFont = Exo_2({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --primary-font: ${headingFont.style.fontFamily};
          --secondary-font: ${bodyFont.style.fontFamily};
          --buttons-font: ${buttonFont.style.fontFamily};
        }
      `}</style>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
