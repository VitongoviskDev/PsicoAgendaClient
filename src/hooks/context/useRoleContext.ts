import { RoleContext } from "@/context/roleContext";
import { useContext } from "react";

export function useRoleContext() {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error("useRoleContext must be used within an RoleContextProvider");
    }
    return context;
}
