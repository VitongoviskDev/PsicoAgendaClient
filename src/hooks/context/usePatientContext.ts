// src/hooks/useAuth.ts
import { PatientContext } from "@/context/patientContext";
import { useContext } from "react";

export function usePatientContext() {
    const context = useContext(PatientContext);
    if (!context) {
        throw new Error("usePatientContext must be used within an PatientProvider");
    }
    return context;
}
