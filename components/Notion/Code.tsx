import React from "react";
import styles from "./Notion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone, faSquareCheck } from "@fortawesome/free-regular-svg-icons";

export const Code = ({
  content,
  html,
  allowCopy,
}: {
  content: string;
  html?: string;
  allowCopy: boolean;
}) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 2000);

    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
  };

  return (
    <div className={styles.code}>
      {allowCopy ? (
        <button
          type="button"
          className={styles.copyBtn}
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <FontAwesomeIcon icon={faSquareCheck} color="green" />
          ) : (
            <FontAwesomeIcon icon={faClone} color="white" />
          )}
        </button>
      ) : null}
      {html ? (
        <div
          className={styles.codeBlock}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className={styles.codeBlock}>
          <code>{content}</code>
        </pre>
      )}
    </div>
  );
};
