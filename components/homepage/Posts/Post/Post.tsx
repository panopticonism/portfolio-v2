import styles from "../Posts.module.css";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faBehance, faGithub } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Project } from "lib/contentful";
import { contentfulImage, contentfulSrcSet } from "lib/images";

const Post = ({ project }: { project: Project }) => {
  const {
    title,
    description,
    imageUrl,
    categories,
    behance,
    github,
    livePreview,
    tools,
  } = project;

  const hasSources = behance || github || livePreview;

  return (
    <article className={styles.post}>
      {hasSources && (
        <div className={styles.sources}>
          <ul>
            {github ? (
              <li>
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${title} on GitHub`}
                >
                  <FontAwesomeIcon icon={faGithub as IconProp} />
                </a>
              </li>
            ) : null}
            {behance ? (
              <li>
                <a
                  href={behance}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${title} on Behance`}
                >
                  <FontAwesomeIcon icon={faBehance as IconProp} />
                </a>
              </li>
            ) : null}
            {livePreview ? (
              <li>
                <a
                  href={livePreview}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${title} live preview`}
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare as IconProp} />
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      )}
      {imageUrl && (
        <div className={styles.image_wrapper}>
          <img
            className={styles.bgImage}
            src={contentfulImage(imageUrl, 800)}
            srcSet={contentfulSrcSet(imageUrl, [400, 800, 1200])}
            sizes="(min-width: 900px) 420px, calc(100vw - 64px)"
            alt={title}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div className={styles.content}>
        {categories.length > 0 && (
          <p className={styles.category}>{categories.join(" · ")}</p>
        )}
        <h2>{title}</h2>
        {description ? <p className={styles.description}>{description}</p> : null}

        {tools.length > 0 ? (
          <div className={styles.tools}>
            <ul>
              {tools.map((tool) => (
                <li key={tool.id}>
                  {tool.iconUrl && (
                    <img
                      src={contentfulImage(tool.iconUrl, 32)}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <p>{tool.title}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
};

export default Post;
