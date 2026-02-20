import { createContext, useState, type ReactNode, type FC } from "react";

export interface BreadCrumbItem {
    label: ReactNode;
    to?: string;
}

interface BreadCrumbContextType {
    breadCrumbItems: BreadCrumbItem[];
    setBreadCrumbItems: (items: BreadCrumbItem[]) => void;
}

export const BreadCrumbContext = createContext<BreadCrumbContextType>(null!);

export const BreadCrumbProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [breadCrumbItems, setBreadCrumbItems] = useState<BreadCrumbItem[]>([]);

    return (
        <BreadCrumbContext.Provider value={{ breadCrumbItems, setBreadCrumbItems }}>
            {children}
        </BreadCrumbContext.Provider>
    );
};
