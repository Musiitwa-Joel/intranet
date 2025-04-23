import { createContext, useContext } from "react";

export const DirectionContext = createContext("ltr");

export function useDirection() {
  return useContext(DirectionContext);
}
