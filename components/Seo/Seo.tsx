import Head from "next/head";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from "lib/site";

type SeoProps = {
  /** Page-specific title; the site name is appended. Omit for the default title. */
  title?: string;
  description?: string;
  /** Path of the page, starting with "/". Used for the canonical URL. */
  path: string;
  type?: "website" | "article";
};

const Seo = ({ title, description, path, type = "website" }: SeoProps) => {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const url = `${SITE_URL}${path}`;
  const image = `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default Seo;
