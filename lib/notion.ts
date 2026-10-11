import { Client, isFullBlock, isFullPage } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { highlightCode } from "./highlightCode";
import { assignSlugs, sortByNewest, type PostIcon, type PostSummary } from "./posts";

export const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

const PUBLISHED_STATUS = "Done";

export type FrontpageCodeBlock = {
  id: string;
  content: string;
  html: string;
};

const plainText = (items: { plain_text: string }[]) =>
  items.map((item) => item.plain_text).join("");

const isPublished = (page: PageObjectResponse) => {
  const status = page.properties.Status;
  return status?.type === "status" && status.status?.name === PUBLISHED_STATUS;
};

const toIcon = (icon: PageObjectResponse["icon"]): PostIcon => {
  switch (icon?.type) {
    case "emoji":
      return { type: "emoji", emoji: icon.emoji };
    case "external":
      return { type: "image", url: icon.external.url };
    case "file":
      return { type: "image", url: icon.file.url };
    default:
      return null;
  }
};

const toPost = (page: PageObjectResponse): Omit<PostSummary, "slug"> => {
  const { Name, Summary, Tags, Date: date, Preview } = page.properties;

  return {
    id: page.id,
    title: Name?.type === "title" ? plainText(Name.title) : "",
    summary: Summary?.type === "rich_text" ? plainText(Summary.rich_text) : "",
    tags:
      Tags?.type === "multi_select"
        ? Tags.multi_select.map(({ id, name }) => ({ id, name }))
        : [],
    icon: toIcon(page.icon),
    date: (date?.type === "date" && date.date?.start) || page.created_time,
    previewUrl: Preview?.type === "url" ? Preview.url : null,
  };
};

/** Blog posts with Status "Done", newest first, each with a URL slug. */
export const getPublishedPosts = async (): Promise<PostSummary[]> => {
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_BLOG_ID ?? "",
  });

  const posts = response.results
    .filter(isFullPage)
    .filter(isPublished)
    .map(toPost);

  return assignSlugs(sortByNewest(posts));
};

/** The code snippets shown next to the portrait on the homepage. */
export const getFrontpageBlocks = async (): Promise<FrontpageCodeBlock[]> => {
  const response = await notionClient.blocks.children.list({
    block_id: process.env.NOTION_FRONTPAGE_ID ?? "",
  });

  const codeBlocks = response.results
    .filter(isFullBlock)
    .flatMap((block) => (block.type === "code" ? [block] : []));

  return Promise.all(
    codeBlocks.map(async (block) => {
      const content = plainText(block.code.rich_text);
      return {
        id: block.id,
        content,
        html: await highlightCode(content, block.code.language),
      };
    }),
  );
};
