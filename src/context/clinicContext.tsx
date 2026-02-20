import { useRegisterClinic } from "@/hooks/clinic/useRegisterClinic";
import { subscribe, unsubscribe } from "@/lib/eventBus";

import type { Clinic } from "@/lib/types/clinic";
import type { RegisterClinicPayload, RegisterClinicResponse } from "@/lib/types/clinic/register-clinic";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface ClinicContextType {
    currentClinic: Clinic | null;
    handleRegisterClinic: (payload: RegisterClinicPayload) => Promise<RegisterClinicResponse>;

    handleSwitchClinic: (clinic: Clinic) => Promise<void>;

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
    const registerClinicMutation = useRegisterClinic();

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

    const handleRegisterClinic = async (payload: RegisterClinicPayload) => {

        const response = await registerClinicMutation.mutateAsync(payload);

        setCurrentClinic(response.data.clinic);
        localStorage.setItem("clinic-context-current", JSON.stringify(response.data.clinic))

        // Note: The caller (CompleteRegistrationStepClinic) should handle the user and token synchronization
        // using handleUpdateUser or similar from AuthContext if needed, 
        // but since the response is returned, we are good here.
        return response;
    }

    const handleSwitchClinic = async (clinic: Clinic) => {
        try {
            // const response = await switchClinicMutation.mutateAsync(payload);
            setCurrentClinic(clinic);
        } catch (error) {

        }
    }

    return (
        <ClinicContext.Provider
            value={{
                currentClinic,
                clinics,

                handleRegisterClinic,
                handleSwitchClinic,
            }}
        >
            {children}
        </ClinicContext.Provider>
    );
}