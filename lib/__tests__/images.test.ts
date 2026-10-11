import { describe, expect, it } from "vitest";
import { absoluteUrl, contentfulImage, contentfulSrcSet } from "../images";

const photo = "https://images.ctfassets.net/space/asset/hash/Frame_261.png";
const vector = "https://images.ctfassets.net/space/asset/hash/logo.svg";

describe("absoluteUrl", () => {
  it("adds https to protocol-relative URLs", () => {
    expect(absoluteUrl("//images.ctfassets.net/x.png")).toBe(
      "https://images.ctfassets.net/x.png",
    );
  });

  it("returns null for missing URLs", () => {
    expect(absoluteUrl(undefined)).toBeNull();
  });
});

describe("contentfulImage", () => {
  it("requests a resized WebP", () => {
    expect(contentfulImage(photo, 800)).toBe(`${photo}?w=800&fm=webp&q=75`);
  });

  it("leaves SVGs and non-Contentful URLs untouched", () => {
    expect(contentfulImage(vector, 48)).toBe(vector);
    expect(contentfulImage("https://example.com/a.png", 48)).toBe(
      "https://example.com/a.png",
    );
  });
});

describe("contentfulSrcSet", () => {
  it("lists one variant per width", () => {
    expect(contentfulSrcSet(photo, [400, 800])).toBe(
      `${photo}?w=400&fm=webp&q=75 400w, ${photo}?w=800&fm=webp&q=75 800w`,
    );
  });

  it("is undefined when the image can't be resized", () => {
    expect(contentfulSrcSet(vector, [400, 800])).toBeUndefined();
  });
});
