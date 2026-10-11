import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

const ThemeContext = createContext<{
    theme: Theme;
    setTheme: (theme: Theme) => void;
}>({
    theme: "dark",
    setTheme: () => { },
});

// The theme class lives on <html>. pages/_document.tsx sets it before first
// paint; this provider keeps React state, the class and localStorage in sync.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("dark");

    useEffect(() => {
        const isLight = document.documentElement.classList.contains("theme-light");
        setThemeState(isLight ? "light" : "dark");
    }, []);

    const setTheme = useCallback((next: Theme) => {
        const root = document.documentElement;
        root.classList.remove("theme-light", "theme-dark");
        root.classList.add(`theme-${next}`);
        try {
            localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
            // Storage can be unavailable (private mode); the theme still applies.
        }
        setThemeState(next);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    return useContext(ThemeContext);
}
