import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { renderBlock } from "components/Notion/Blocks";
import { GetStaticPaths, GetStaticProps } from "next";
import styles from "./Post.module.css";
import { ThemeSwitch } from "components/ThemeSwitch/ThemeSwitch";
import { Socials } from "components";
import Seo from "components/Seo/Seo";
import { highlightNotionBlocks } from "lib/highlightCode";
import { getPublishedPosts, notionClient } from "lib/notion";
import { isSameNotionId, type PostSummary } from "lib/posts";

type PostProps = {
  post: PostSummary;
  blocks: { id: string }[];
};

export default function Post({ post, blocks }: PostProps) {
  return (
    <div className="common">
      <Seo
        title={post.title}
        description={post.summary}
        path={`/blog/${post.slug}`}
        type="article"
      />
      <Header />
      <article className={styles.container}>
        <h1>{post.title}</h1>
        <section className={styles.articleSection}>
          {blocks.map((block) => (
            <div key={block.id}>{renderBlock(block)}</div>
          ))}
        </section>
        {post.previewUrl && <Socials isBlog url={post.previewUrl} />}
      </article>
      <Footer />
      <ThemeSwitch />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPublishedPosts();

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    // Unknown slugs are resolved on demand: posts published after the last
    // build, and old /blog/<notion-id> links, which redirect to the slug.
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PostProps, { slug: string }> = async ({
  params,
}) => {
  const slug = params?.slug ?? "";
  const posts = await getPublishedPosts();

  const legacyMatch = posts.find((post) => isSameNotionId(post.id, slug));
  if (legacyMatch) {
    return {
      redirect: { destination: `/blog/${legacyMatch.slug}`, permanent: true },
    };
  }

  const post = posts.find((candidate) => candidate.slug === slug);
  if (!post) {
    return { notFound: true, revalidate: 60 };
  }

  const blocks = await notionClient.blocks.children.list({ block_id: post.id });

  return {
    props: {
      post,
      blocks: await highlightNotionBlocks(blocks.results),
    },
    revalidate: 60,
  };
};
