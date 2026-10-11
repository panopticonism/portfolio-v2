import type { GetServerSideProps, NextPage } from "next";
import React, { useRef } from "react";
import { Header, Socials, Footer, ProjectsCTA } from "components";
import { Introduction, Steps, Posts, Tech } from "components/homepage";
import { useThemeContext } from "contexts/theme-context";
import { FetchDataProps } from "types/App.types";
import { client } from "./api/lib/Contentful";
import { ThemeSwitch } from "components/ThemeSwitch/ThemeSwitch";
import { notionClient } from "./api/lib/Notion";
import { highlightNotionBlocks } from "lib/highlightCode";

const Home: NextPage<FetchDataProps> = ({
  projects,
  skills,
  frontpageBlocks,
}) => {
  const { theme } = useThemeContext();

  const projectsRef = useRef<any>(null);
  function handleBackClick() {
    projectsRef?.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className={`common theme-${theme}`}>
      <Header />
      <main>
        <Socials />
        <Introduction blocks={frontpageBlocks} />
        <Steps />
        <Tech skills={skills} />
        <Posts ref={projectsRef} projects={projects.items} />
        <ProjectsCTA onClick={handleBackClick} />
      </main>
      <Footer />
      <ThemeSwitch />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const pageId = process.env.NOTION_FRONTPAGE_ID || "";

  const blocks = await notionClient.blocks.children.list({
    block_id: pageId,
  });
  const frontpageBlocks = await highlightNotionBlocks(blocks.results);

  const projects = await client.getEntries({
    content_type: "project",
    order: "fields.id",
  });
  const skills = await client.getEntries({
    content_type: "toolshed",
    order: "fields.id",
  });

  return {
    props: { projects, skills, frontpageBlocks },
  };
};

export default Home;
