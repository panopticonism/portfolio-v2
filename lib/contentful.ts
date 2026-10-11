import { createClient } from "contentful";
import { absoluteUrl } from "./images";

const client = createClient({
  space: "b2e19nh5y1ak",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
  environment: "master",
});

export type Tool = {
  id: string;
  title: string;
  iconUrl: string | null;
};

export type Project = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  categories: string[];
  behance: string | null;
  github: string | null;
  livePreview: string | null;
  tools: Tool[];
};

// Shapes of the Contentful entries, limited to the fields this site reads.
type Asset = { fields?: { file?: { url?: string } } };

type ToolFields = {
  id?: number;
  title: string;
  icon?: Asset;
};

type ProjectFields = {
  title: string;
  description?: string;
  image?: Asset;
  category?: string | string[];
  behance?: string;
  github?: string;
  livePreview?: string;
  tools?: { sys: { id: string }; fields: ToolFields }[];
};

type Entry<Fields> = { sys: { id: string }; fields: Fields };

const getEntries = async <Fields>(contentType: string) => {
  const response = await client.getEntries({
    content_type: contentType,
    order: ["fields.id"],
  });
  return response.items as unknown as Entry<Fields>[];
};

const toTool = ({ sys, fields }: Entry<ToolFields>): Tool => ({
  id: sys.id,
  title: fields.title,
  iconUrl: absoluteUrl(fields.icon?.fields?.file?.url),
});

// "category" is a comma-separated list in Contentful; "All" was a filter tab.
const toCategories = (category: ProjectFields["category"]) =>
  `${category ?? ""}`
    .split(",")
    .map((c) => c.trim())
    .filter((c) => c && c.toLowerCase() !== "all");

export const getProjects = async (): Promise<Project[]> => {
  const entries = await getEntries<ProjectFields>("project");

  return entries.map(({ sys, fields }) => ({
    id: sys.id,
    title: fields.title,
    description: fields.description ?? null,
    imageUrl: absoluteUrl(fields.image?.fields?.file?.url),
    categories: toCategories(fields.category),
    behance: fields.behance ?? null,
    github: fields.github ?? null,
    livePreview: fields.livePreview ?? null,
    tools: (fields.tools ?? []).filter((tool) => tool.fields).map(toTool),
  }));
};
