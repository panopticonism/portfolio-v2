import { Footer, Header } from "components";
import { Entries } from "components/Entries/Entries";
import { GetStaticProps, NextPage } from "next";
import React from "react";
import { ThemeSwitch } from "components/ThemeSwitch/ThemeSwitch";
import Seo from "components/Seo/Seo";
import { getPublishedPosts } from "lib/notion";
import type { PostSummary } from "lib/posts";

type BlogProps = {
  posts: PostSummary[];
};

const Blog: NextPage<BlogProps> = ({ posts }) => {
  return (
    <div className="common">
      <Seo
        title="Blog"
        description="Notes and write-ups on frontend development, React and TypeScript."
        path="/blog"
      />
      <Header />
      <h1>Blog</h1>
      <Entries posts={posts} />
      <Footer />
      <ThemeSwitch />
    </div>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  return {
    props: { posts: await getPublishedPosts() },
    revalidate: 60,
  };
};
