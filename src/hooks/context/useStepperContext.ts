// src/hooks/useAuth.ts
import { StepperContext } from "@/context/stepperContext";
import { useContext } from "react";

export function useStepperContext() {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepperContext must be used within an StepperProvider");
  }
  return context;
}
