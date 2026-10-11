// Site-wide copy and settings. Edit the wording here; every page reads from it.

import { CircleCI } from "components/icons/CircleCI";
import type { IconProps } from "components/icons/types";

export const SITE_URL = "https://mal.fyi";
export const SITE_NAME = "MAL";
export const DEFAULT_TITLE = "MAL — Software Engineer";

export const AUTHOR_NAME = "Maria J. Almeida";
export const PITCH =
  "Engineer with a designer's eye: I care about what we build as much as how we build it.";

export const DEFAULT_DESCRIPTION = `${AUTHOR_NAME}, software engineer with a designer's eye. Cares about what gets built as much as how it's built.`;
export const DEFAULT_OG_IMAGE = "/illustrated-self.png";

export type Skill = {
  title: string;
  /** Path under public/, or an inline SVG component that follows the theme colour. */
  icon: string | ((props: IconProps) => React.JSX.Element);
};

// The homepage tech stack, in display order. Icons live in public/skills/.
export const SKILLS: Skill[] = [
  { title: "TypeScript", icon: "/skills/typescript.webp" },
  { title: "React", icon: "/skills/react.svg" },
  { title: "Next.js", icon: "/skills/next-js.webp" },
  { title: "Vue", icon: "/skills/vue.svg" },
  { title: "Node.js", icon: "/skills/node-js.svg" },
  { title: "PostgreSQL", icon: "/skills/postgresql.svg" },
  { title: "MySQL", icon: "/skills/mysql.webp" },
  { title: "MongoDB", icon: "/skills/mongodb.webp" },
  { title: "GraphQL", icon: "/skills/graphql.svg" },
  { title: "Spring Boot", icon: "/skills/spring-boot.webp" },
  { title: "Docker", icon: "/skills/docker.svg" },
  { title: "CircleCI", icon: CircleCI },
  { title: "Azure", icon: "/skills/azure.webp" },
];
