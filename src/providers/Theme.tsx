import { createContext, ReactNode, useState } from "react";

export const ThemeContext = createContext({} as ThemeProviderType);

type Theme = "light" | "dark";

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeProviderType = {
  theme: Theme;
  toggleTheme: () => void;
};

export function ThemeProvider(props: ThemeProviderProps) {
  const [currentTheme, setCurrenteTheme] = useState<Theme>(() => {
    const storageTheme = localStorage.getItem("theme");
    return (storageTheme ?? "dark") as Theme;
  });

  function toggleTheme() {
    setCurrenteTheme(currentTheme === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
