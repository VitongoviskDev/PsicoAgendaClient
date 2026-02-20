import { ProfileContext } from "@/context/profileContext";
import { useContext } from "react";

export function useProfileContext() {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfileContext must be used within a ProfileProvider");
    }
    return context;
}
