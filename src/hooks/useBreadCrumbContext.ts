import { useContext } from "react";
import { BreadCrumbContext } from "@/context/breadCrumbContext";

export function useBreadCrumbContext() {
    const context = useContext(BreadCrumbContext);
    if (!context) {
        throw new Error("useBreadCrumbContext must be used within a BreadCrumbProvider");
    }
    return context;
}
