import { describe, expect, it } from "vitest";
import { assignSlugs, isSameNotionId, slugify, sortByNewest } from "../posts";

describe("slugify", () => {
  it("lowercases and hyphenates titles", () => {
    expect(slugify("TypeScript - Basic Concepts")).toBe("typescript-basic-concepts");
  });

  it("drops punctuation and escape sequences", () => {
    expect(slugify("String parsing (\\n)")).toBe("string-parsing-n");
    expect(slugify("Window: Storage Event")).toBe("window-storage-event");
  });

  it("strips accents and apostrophes", () => {
    expect(slugify("Marizé's shop")).toBe("marizes-shop");
  });
});

describe("sortByNewest", () => {
  const posts = [
    { id: "a", date: "2022-01-10" },
    { id: "b", date: "2024-05-01" },
    { id: "c", date: "2023-03-15T10:00:00.000Z" },
  ];

  it("orders posts newest first", () => {
    expect(sortByNewest(posts).map((post) => post.id)).toEqual(["b", "c", "a"]);
  });

  it("does not mutate the input", () => {
    sortByNewest(posts);
    expect(posts.map((post) => post.id)).toEqual(["a", "b", "c"]);
  });
});

describe("assignSlugs", () => {
  it("suffixes duplicate slugs with part of the id", () => {
    const result = assignSlugs([
      { id: "11111111-aaaa", title: "Git Basics" },
      { id: "22222222-bbbb", title: "GIT basics" },
    ]);

    expect(result.map((post) => post.slug)).toEqual([
      "git-basics",
      "git-basics-22222222",
    ]);
  });

  it("falls back to the id when the title has no usable characters", () => {
    expect(assignSlugs([{ id: "abc", title: "🎉" }])[0].slug).toBe("abc");
  });
});

describe("isSameNotionId", () => {
  it("matches ids with or without dashes", () => {
    expect(
      isSameNotionId(
        "dcb11221-ff5b-4fe6-ac4b-8274a6200c40",
        "dcb11221ff5b4fe6ac4b8274a6200c40",
      ),
    ).toBe(true);
    expect(isSameNotionId("dcb11221-ff5b", "git-basics")).toBe(false);
  });
});
