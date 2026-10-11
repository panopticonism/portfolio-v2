import Link from 'next/link';
import React from 'react';
import styles from "./Entries.module.css";
import type { PostSummary } from 'lib/posts';

const colors: Record<string, string> = {
    "JavaScript": "#c2b13f",
    "TypeScript": "#007acc",
    "React": "#57c4e1",
    "Frontend": "#007d55",
    "Material UI": "rgb(0, 127, 255)",
    "GIT": "#F1502F",
    "Tools": "#795695",
    "Resources": "#fc9d09",
    "Testing": "#FF7F50",
    "Jest": "#944059"
}

export const Entries = ({ posts }: { posts: PostSummary[] }) => {
    return (
        <main className={styles.entries}>
            {posts.map((post) =>
                <article key={post.id}>
                    {post.icon && (
                        <span className={styles.icon}>
                            {post.icon.type === "emoji"
                                ? post.icon.emoji
                                : <img src={post.icon.url} alt="" width={30} height={30} />}
                        </span>
                    )}
                    <h2>{post.title}</h2>
                    {post.tags.length > 0 && <ul>{post.tags.map((tag) =>
                        <li key={tag.id} style={{ background: colors[tag.name] }}>{tag.name}</li>)}</ul>}
                    <p>{post.summary}</p>
                    <Link href={`/blog/${post.slug}`}>
                        <div className={styles.learn_more}>
                            <div className={styles.projects_button}>
                                <span>Read article →</span>
                            </div>
                        </div>
                    </Link>
                </article>
            )}
        </main>
    )
}
