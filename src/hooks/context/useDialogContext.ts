import { DialogContext } from "@/context/dialogContext";
import { use } from "react";


export function useDialogContext() {
    const ctx = use(DialogContext);
    if (!ctx) {
        throw new Error("useDialog must be used inside <DialogProvider>");
    }
    return ctx;
}
