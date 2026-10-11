export type PostIcon =
  | { type: "emoji"; emoji: string }
  | { type: "image"; url: string }
  | null;

export type PostTag = {
  id: string;
  name: string;
};

export type PostSummary = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  tags: PostTag[];
  icon: PostIcon;
  date: string;
  previewUrl: string | null;
};

/** "String parsing (\n)" -> "string-parsing-n" */
export const slugify = (title: string) =>
  title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Newest first. Returns a new array; the input is left untouched. */
export const sortByNewest = <T extends { date: string }>(posts: T[]): T[] =>
  [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

/**
 * Gives every post a URL slug derived from its title. Posts whose title
 * slugifies to an already-used slug get a short id suffix, so URLs stay unique.
 */
export const assignSlugs = <T extends { id: string; title: string }>(
  posts: T[],
): (T & { slug: string })[] => {
  const used = new Set<string>();

  return posts.map((post) => {
    let slug = slugify(post.title) || post.id;
    if (used.has(slug)) {
      slug = `${slug}-${post.id.replace(/-/g, "").slice(0, 8)}`;
    }
    used.add(slug);
    return { ...post, slug };
  });
};

/** Notion page ids appear in old URLs with or without dashes. */
export const isSameNotionId = (a: string, b: string) =>
  a.replace(/-/g, "").toLowerCase() === b.replace(/-/g, "").toLowerCase();
