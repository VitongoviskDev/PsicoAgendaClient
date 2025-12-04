// src/hooks/useAuth.ts
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
