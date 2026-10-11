import styles from "./ProjectsCTA.module.css";
import { ProjectsCTAProps } from "./ProjectsCTA.types";

const ProjectsCTA = ({ onClick }: ProjectsCTAProps) => {
  return (
    <div className={styles.projects_breadcumbs}>
      <div className={styles.wrapper}>
        <button type="button" className={styles.pointer} onClick={onClick}>
          Projects
        </button>
      </div>
    </div>
  );
};

export default ProjectsCTA;
