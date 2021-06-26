import { useContext } from "react";
import { ThemeContext } from "../providers/Theme";

export function useTheme() {
  const value = useContext(ThemeContext);
  return value;
}
