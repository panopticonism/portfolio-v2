import styles from "./Posts.module.css";
import Post from "./Post/Post";
import { forwardRef } from "react";
import type { Project } from "lib/contentful";

const Posts = forwardRef<HTMLElement, { projects: Project[] }>(
  ({ projects }, ref) => {
    return (
      <section id="projects" className={styles.projects} ref={ref}>
        <h1>Portfolio</h1>
        <div className={styles.portfolio}>
          {projects.map((project) => (
            <Post project={project} key={project.id} />
          ))}
        </div>
      </section>
    );
  }
);

Posts.displayName = "Posts";
export default Posts;
