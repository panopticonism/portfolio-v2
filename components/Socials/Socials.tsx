import { icons } from "components/icons";
import styles from "./Socials.module.css";

const Socials = ({ isBlog, url }: { isBlog?: boolean, url?: string }) => {
  return (
    <div className={styles.social_media}>
      <ul>
        {!isBlog &&
          <>
            <li>
              <a
                href="https://www.linkedin.com/in/mariajalmeida/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <icons.LinkedInIcon width={30} height={30} />
              </a>
            </li>
            <li>
              <a
                href="https://www.behance.net/panopticonism"
                target="_blank"
                rel="noreferrer"
                aria-label="Behance"
              >
                <icons.BehanceIcon width={30} height={30} />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/PANOPTICONISM"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <icons.GitHubIcon width={30} height={30} />
              </a>
            </li>
          </>
        }
        <li className={styles.pointer}>
          <a
            href={isBlog ? url : "https://codesandbox.io/u/panopticonism"}
            target="_blank"
            rel="noreferrer"
            aria-label={isBlog ? "Source" : "CodeSandbox"}
          >
            <icons.SandboxIcon width={30} height={30} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Socials;
