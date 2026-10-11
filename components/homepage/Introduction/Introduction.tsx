import { Allura } from "next/font/google";
import styles from "./Introduction.module.css";
import { Code } from "components/Notion/Code";
import { AUTHOR_NAME, PITCH } from "lib/site";
import type { FrontpageCodeBlock } from "lib/notion";

// Old-school script for the name, self-hosted by next/font.
const handwriting = Allura({ subsets: ["latin"], weight: "400" });

// Pre-resized WebP copies of public/illustrated-self.png (the PNG is kept for
// social previews). Plain <img> rather than next/image: next/image on this page
// breaks Turbopack dev in Next 16.4 ("module factory is not available").
const portraitSrcSet = [400, 700, 1000]
  .map((width) => `/illustrated-self-${width}.webp ${width}w`)
  .join(", ");

const Introduction = ({ blocks }: { blocks: FrontpageCodeBlock[] }) => {
  return (
    <section className={styles.intro}>
      <div className={styles.portrait_wrapper}>
        <img
          className={styles.portrait}
          src="/illustrated-self-700.webp"
          srcSet={portraitSrcSet}
          sizes="(min-width: 1200px) 500px, 350px"
          alt={`Illustrated portrait of ${AUTHOR_NAME}`}
          width={1000}
          height={1000}
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className={styles.text}>
        <h1 className={`${styles.name} ${handwriting.className}`}>{AUTHOR_NAME}</h1>
        <p className={styles.pitch}>{PITCH}</p>
        <div className={styles.code_stack}>
          {blocks.map((block) => (
            <Code
              key={block.id}
              content={block.content}
              html={block.html}
              allowCopy={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Introduction;
