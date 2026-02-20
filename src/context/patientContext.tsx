


import type { Patient } from "@/lib/types/patient";
import { createContext, useState, type ReactNode } from "react";

interface PatientContextType {
    selectedPatient: Patient | null;
    handleChangePatient: (patient: Patient | null) => void;
}

export const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: ReactNode }) {

    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(() => {
        const storedUser = localStorage.getItem("patient-context");
        return !!storedUser ? (JSON.parse(storedUser) as Patient) : null;
    });

    const handleChangePatient = (patient: Patient | null) => {
        setSelectedPatient(patient);
        localStorage.setItem("patient-context", JSON.stringify(patient));
    }


    return (
        <PatientContext.Provider
            value={{
                selectedPatient,
                handleChangePatient,
            }}
        >
            {children}
        </PatientContext.Provider>
    );
}
