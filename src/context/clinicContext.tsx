import { subscribe, unsubscribe } from "@/lib/eventBus";

import type { Clinic } from "@/lib/types/clinic";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface ClinicContextType {
    currentClinic: Clinic | null;
    updateCurrentClinic: (clinic: Clinic) => void

    clinics: Clinic[];
    updateClinics: (clinics: Clinic[]) => void
}

export const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export function ClinicProvider({ children }: { children: ReactNode }) {
    const [currentClinic, setCurrentClinic] = useState<Clinic | null>(() => {
        const storedClinic = localStorage.getItem("clinic-context-current");
        return !!storedClinic ? (JSON.parse(storedClinic) as Clinic) : null;
    });
    const [clinics, setClinics] = useState<Clinic[]>(() => {
        const storedClinic = localStorage.getItem("clinic-context-all");
        return !!storedClinic ? (JSON.parse(storedClinic) as Clinic[]) : [];
    });

    useEffect(() => {
        subscribe("login", "ClinicContext", ({ clinic, clinics }) => {
            updateCurrentClinic(clinic);
            updateClinics(clinics);
        });

        subscribe("logout", "ClinicContext", ({ }) => {
            clearSessionData();
        });

        return () => unsubscribe("login", "ClinicContext");
    }, []);

    const updateCurrentClinic = (clinic: Clinic) => {
        setCurrentClinic(clinic);
        localStorage.setItem("clinic-context-current", JSON.stringify(clinic))
    }
    const updateClinics = (clinics: Clinic[]) => {
        setClinics(clinics);
        localStorage.setItem("clinic-context-all", JSON.stringify(clinics))
    }

    const clearSessionData = () => {
        alert("cleaning clinic context");
        localStorage.removeItem("clinic-context-current")
        localStorage.removeItem("clinic-context-all")
    }


    return (
        <ClinicContext.Provider
            value={{
                currentClinic,
                updateCurrentClinic,

                clinics,
                updateClinics
            }}
        >
            {children}
        </ClinicContext.Provider>
    );
}
