/** Contentful returns protocol-relative URLs ("//images.ctfassets.net/..."). */
export const absoluteUrl = (url?: string | null) => {
  if (!url) return null;
  return url.startsWith("//") ? `https:${url}` : url;
};

/**
 * Resized WebP version of a Contentful image, via the Contentful Images API.
 * SVGs are vector already and the API can't convert them, so they pass through.
 * https://www.contentful.com/developers/docs/references/images-api/
 */
export const contentfulImage = (url: string, width: number) => {
  if (!url.includes("images.ctfassets.net") || /\.svg($|\?)/i.test(url)) {
    return url;
  }
  return `${url}?w=${width}&fm=webp&q=75`;
};

/** `srcset` with one resized variant per width; undefined when resizing isn't possible. */
export const contentfulSrcSet = (url: string, widths: number[]) => {
  if (contentfulImage(url, widths[0]) === url) return undefined;
  return widths.map((width) => `${contentfulImage(url, width)} ${width}w`).join(", ");
};
