import { useCompleteClinic } from "@/hooks/clinic/useCompleteClinic";
import { subscribe, unsubscribe } from "@/lib/eventBus";

import type { Clinic, CompleteClinicPayload, CompleteClinicResponse } from "@/lib/types/clinic";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface ClinicContextType {
    currentClinic: Clinic | null;
    handleCompleteClinic: (payload: CompleteClinicPayload) => Promise<CompleteClinicResponse>;

    clinics: Clinic[];
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

    // HOOKS
    const completeClinicMutation = useCompleteClinic();

    // EVENTS
    useEffect(() => {
        subscribe("login", "ClinicContext", ({ clinic, clinics }) => {

            setCurrentClinic(clinic);
            localStorage.setItem("clinic-context-current", JSON.stringify(clinic))

            setClinics(clinics);
            localStorage.setItem("clinic-context-all", JSON.stringify(clinics))
        });

        subscribe("logout", "ClinicContext", ({ }) => {
            clearSessionData();
        });

        return () => {
            unsubscribe("login", "ClinicContext");
            unsubscribe("logout", "ClinicContext");
        };
    }, []);

    const clearSessionData = () => {
        localStorage.removeItem("clinic-context-current")
        localStorage.removeItem("clinic-context-all")
    }

    const handleCompleteClinic = async (payload: CompleteClinicPayload) => {

        const response = await completeClinicMutation.mutateAsync(payload);

        setCurrentClinic(response.data.clinic);
        localStorage.setItem("clinic-context-current", JSON.stringify(response.data.clinic))
        return response;
    }

    return (
        <ClinicContext.Provider
            value={{
                currentClinic,
                clinics,

                handleCompleteClinic,
            }}
        >
            {children}
        </ClinicContext.Provider>
    );
}