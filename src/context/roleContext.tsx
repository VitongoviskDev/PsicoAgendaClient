import { createContext, useState, type ReactNode } from "react";

import { setLogoutHandler } from "@/lib/apis/client";
import type { Role } from "@/lib/types/role";


interface RoleContextType {
    role: Role | null;
    setRole: (role: Role) => void;
}

export const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleContextProvider({ children }: { children: ReactNode }) {

    const [role, set] = useState<Role | null>(() => {
        const storedRole = localStorage.getItem("role");
        return !!storedRole ? (JSON.parse(storedRole) as Role) : null;
    });

    const setRole = async (role: Role) => {
        set(role);
        localStorage.setItem("role", JSON.stringify(role));
    }


    const clearSessionData = () => {
        localStorage.removeItem("role");
        set(null);
    };

    function onLogout() {
        clearSessionData();
    }

    setLogoutHandler(onLogout);

    return (
        <RoleContext.Provider
            value={{
                role,
                setRole,
            }}
        >
            {children}
        </RoleContext.Provider>
    );
}
