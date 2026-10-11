import React from 'react'
import { useThemeContext } from 'contexts/theme-context';
import styles from "./ThemeSwitch.module.css";

export const ThemeSwitch = () => {
    const { theme, setTheme } = useThemeContext();
    const isDark = theme === 'dark';

    return (
        <label className={styles.switch}>
            <span className={styles.srOnly}>Dark mode</span>
            <input
                type="checkbox"
                role="switch"
                aria-label="Dark mode"
                checked={isDark}
                onChange={() => setTheme(isDark ? 'light' : 'dark')}
            />
            <span className={`${styles.slider} ${styles.round}`} aria-hidden="true"></span>
        </label>
    )
}
