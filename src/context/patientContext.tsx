


import type { Patient } from "@/lib/types/patient";
import type { PatientByCpfCustomError, PatientByCpfPayload, User } from "@/lib/types/user";
import { createContext, useState, type ReactNode } from "react";
import { toast } from "sonner";

interface PatientContextType {
    selectedPatient: Patient | null;
    handleChangePatient: (patient: Patient | null) => void;

    getPatientByCPF: (payload: PatientByCpfPayload) => Promise<User> | null;
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

    const getPatientByCPF = (payload: PatientByCpfPayload) => {
        try {
            return null
        } catch (err) {
            const customError = err as PatientByCpfCustomError;

            toast.error(customError.message);

            throw customError;
        }
    }

    return (
        <PatientContext.Provider
            value={{
                selectedPatient,
                handleChangePatient,

                getPatientByCPF
            }}
        >
            {children}
        </PatientContext.Provider>
    );
}
