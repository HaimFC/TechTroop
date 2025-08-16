import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(undefined);

const THEME_KEY = "app_theme";
const FONT_KEY = "app_font_size";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem(THEME_KEY) || "light";
  });

  const [fontSize, setFontSize] = useState(() => {
    if (typeof window === "undefined") return "medium";
    return localStorage.getItem(FONT_KEY) || "medium";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(FONT_KEY, fontSize);
    }
  }, [fontSize]);

  const value = useMemo(
    () => ({ theme, setTheme, fontSize, setFontSize }),
    [theme, fontSize]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error("useTheme must be used within a <ThemeProvider />");
  }
  return ctx;
}
