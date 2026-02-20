import { subscribe, unsubscribe } from "@/lib/eventBus";
import type { PatientProfile, PsychologistProfile, StaffProfile, User } from "@/lib/types/user/user";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface ProfileContextType {
    staff: StaffProfile | null;
    psychologist: PsychologistProfile | null;
    patient: PatientProfile | null;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const PROFILES_KEY = "user_profiles";

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [profiles, setProfiles] = useState<ProfileContextType>(() => {
        const stored = localStorage.getItem(PROFILES_KEY);
        return stored ? JSON.parse(stored) : { staff: null, psychologist: null, patient: null };
    });

    useEffect(() => {
        const handleLogin = (payload: { user: User }) => {
            const newProfiles = {
                staff: payload.user.profiles?.staff || null,
                psychologist: payload.user.profiles?.psychologist || null,
                patient: payload.user.profiles?.patient || null,
            };
            setProfiles(newProfiles);
            localStorage.setItem(PROFILES_KEY, JSON.stringify(newProfiles));
        };

        const handleLogout = () => {
            const emptyProfiles = { staff: null, psychologist: null, patient: null };
            setProfiles(emptyProfiles);
            localStorage.removeItem(PROFILES_KEY);
        };

        subscribe("login", "profile-context", handleLogin);
        subscribe("logout", "profile-context", handleLogout);

        return () => {
            unsubscribe("login", "profile-context");
            unsubscribe("logout", "profile-context");
        };
    }, []);

    return (
        <ProfileContext.Provider value={profiles}>
            {children}
        </ProfileContext.Provider>
    );
}
