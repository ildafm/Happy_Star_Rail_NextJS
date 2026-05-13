// app/context/AccentContext.jsx
"use client";

import { createContext, useContext, useState } from "react";

const AccentContext = createContext(null);

export function AccentProvider({ children }) {
  const [accentKey, setAccentKey] = useState("purple"); // default: deep space purple

  return (
    <AccentContext.Provider value={{ accentKey, setAccentKey }}>
      {children}
    </AccentContext.Provider>
  );
}

export function useAccent() {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error("useAccent must be used within AccentProvider");
  return ctx;
}
