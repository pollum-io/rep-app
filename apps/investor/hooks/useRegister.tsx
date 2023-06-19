import { RegisterContext } from "../contexts/register";
import { useContext } from "react";

export function useRegister() {
  return useContext(RegisterContext);
}
