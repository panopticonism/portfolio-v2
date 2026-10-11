import styles from "./Tech.module.css";
import { SKILLS } from "lib/site";

const Tech = () => {
  return (
    <section className={styles.tech} aria-label="Tech stack">
      <h1>Tech Stack</h1>

      <ul className={styles.list}>
        {SKILLS.map((skill) => (
          <li key={skill.title} className={styles.skill}>
            {typeof skill.icon === "string" ? (
              <img
                src={skill.icon}
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <skill.icon width={24} height={24} />
            )}
            <p>{skill.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Tech;
