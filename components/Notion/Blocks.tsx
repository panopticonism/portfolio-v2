import Link from "next/link";
import styles from "./Notion.module.css";
import { Callout } from "./Callout";
import { Code } from "./Code";
import { Headline, Subheadline } from "./Headlines";
import { BulletedList, NumberedList } from "./Lists";
import { TextField } from "./TextField";

export const renderBlock = (block: any) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return <TextField text={value.rich_text} />;
    case "callout":
      return <Callout text={value} />;
    case "heading_1":
      return <Headline title={value.rich_text[0]} />;
    case "heading_2":
      return <Subheadline title={value.rich_text[0]} />;
    case "heading_3":
      return (
        <h4>
          <TextField text={value.rich_text} />
        </h4>
      );
    case "bulleted_list_item":
      return <BulletedList text={value.rich_text} />;
    case "numbered_list_item":
      return <NumberedList block={block} />;
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <TextField text={value.rich_text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <TextField text={value.rich_text} />
          </summary>
          {value.children?.map((block: any) => (
            <div key={block.id}>{renderBlock(block)}</div>
          ))}
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <>
          <img width="100%" src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </>
      );
    case "divider":
      return <hr key={id} />;
    case "quote":
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;
    case "code":
      return (
        <Code
          content={value.rich_text[0]?.plain_text}
          html={value.html}
          allowCopy
        />
      );
    case "file":
      const src_file =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <div className={styles.file}>
            📎{" "}
            <Link href={src_file} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case "bookmark":
      const href = value.url;
      return (
        <a href={href} target="_blank" rel="noreferrer" className={styles.bookmark}>
          {href}
        </a>
      );
    default:
      return `Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};
