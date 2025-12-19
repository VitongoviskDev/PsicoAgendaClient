// src/hooks/useAuth.ts
import { ClinicContext } from "@/context/clinicContext";
import { useContext } from "react";

export function useClinicContext() {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error("useClinicContext must be used within an ClinicProvider");
  }
  return context;
}
