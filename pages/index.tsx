import type { GetStaticProps, NextPage } from "next";
import React, { useRef } from "react";
import Header from "components/Header/Header";
import Socials from "components/Socials/Socials";
import Footer from "components/Footer/Footer";
import ProjectsCTA from "components/ProjectsCTA/ProjectsCTA";
import { Introduction, Steps, Posts, Tech } from "components/homepage";
import { ThemeSwitch } from "components/ThemeSwitch/ThemeSwitch";
import Seo from "components/Seo/Seo";
import { getProjects, type Project } from "lib/contentful";
import { getFrontpageBlocks, type FrontpageCodeBlock } from "lib/notion";

type HomeProps = {
  projects: Project[];
  frontpageBlocks: FrontpageCodeBlock[];
};

const Home: NextPage<HomeProps> = ({ projects, frontpageBlocks }) => {
  const projectsRef = useRef<HTMLElement>(null);
  function handleBackClick() {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="common">
      <Seo path="/" />
      <Header />
      <main>
        <Socials />
        <Introduction blocks={frontpageBlocks} />
        <Steps />
        <Tech />
        <Posts ref={projectsRef} projects={projects} />
        <ProjectsCTA onClick={handleBackClick} />
      </main>
      <Footer />
      <ThemeSwitch />
    </div>
  );
};

// Built statically and refreshed in the background at most once a minute, so
// visitors get a cached page instead of waiting on Notion and Contentful.
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const [frontpageBlocks, projects] = await Promise.all([
    getFrontpageBlocks(),
    getProjects(),
  ]);

  return {
    props: { projects, frontpageBlocks },
    revalidate: 60,
  };
};

export default Home;
