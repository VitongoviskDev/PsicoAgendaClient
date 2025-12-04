'use client';
import { createContext, useState, type ReactNode } from "react";

export type DialogKey =
    | "agenda-create-appointment";

interface DialogContextType {
    activeDialog: DialogKey | null;
    openDialog: (key: DialogKey) => void;
    closeDialog: () => void;
}

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
    const [activeDialog, setActiveDialog] = useState<DialogKey | null>(null);

    const openDialog = (key: DialogKey) => setActiveDialog(key);
    const closeDialog = () => setActiveDialog(null);

    return (
        <DialogContext.Provider value={{ activeDialog, openDialog, closeDialog }}>
            {children}
        </DialogContext.Provider>
    );
}