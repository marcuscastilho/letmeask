import { useContext } from "react";
import { AuthContext } from "../providers/Auth";

export function useAuth() {
  const value = useContext(AuthContext);
  return value;
}
