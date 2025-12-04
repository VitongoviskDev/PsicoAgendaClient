import { DialogContext } from "@/context/dialogContext";
import { use } from "react";


export function useDialog() {
    const ctx = use(DialogContext);
    if (!ctx) {
        throw new Error("useDialog must be used inside <DialogProvider>");
    }
    return ctx;
}
