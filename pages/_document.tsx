import { Html, Head, Main, NextScript } from "next/document";
import { THEME_STORAGE_KEY } from "contexts/theme-context";

// Runs before first paint so the page never flashes the wrong theme:
// a saved choice wins, otherwise the OS preference, otherwise dark.
const setInitialTheme = `(function () {
  var theme = "dark";
  try {
    var saved = localStorage.getItem("${THEME_STORAGE_KEY}");
    if (saved === "light" || saved === "dark") {
      theme = saved;
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      theme = "light";
    }
  } catch (e) {}
  document.documentElement.classList.add("theme-" + theme);
})();`;

export default function Document() {
  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
