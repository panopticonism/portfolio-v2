import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import useScreenSize from "hooks/useScreenSize";
import { Logo } from "components/icons/Logo";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const { isDesktop } = useScreenSize();

  useEffect(() => {
    if (isOpen === true && !isDesktop) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isDesktop, isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView();
      }
    }, 700);
  }, []);

  return (
    <header className={styles.header}>
      <Link href="/" aria-label="Home" className={styles.logo_link}>
        <Logo width={50} height={83} />
      </Link>
      <button
        type="button"
        className={`${styles.closeBox} ${isOpen ? styles.show : ""}`}
        onClick={toggle}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="primary-nav"
      >
        <span className={styles.closeBtn} aria-hidden="true"></span>
      </button>
      <nav aria-label="Primary">
        <ul
          id="primary-nav"
          className={`${styles.list} ${isOpen ? styles.show : ""}`}
        >
          <li>
            <Link href="/#steps" onClick={close}>
              Competences
            </Link>
          </li>
          <li>
            <Link href="/#projects" onClick={close}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/blog" onClick={close}>
              Blog
            </Link>
          </li>
          <li className={styles.contact_me}>
            <Link href="#contact_me" onClick={close}>
              <span>Contact me</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
