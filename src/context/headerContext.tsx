"use client"

import { createContext, useState, type ReactNode } from "react"


type HeaderContextType = {
    pageTitle: string,
    setPageTitle: (pageTitle: string) => void

    pageDescription: string,
    setPageDescription: (description: string) => void
}

export const HeaderContext = createContext<HeaderContextType>(null!)

export function HeaderProvider({ children }: { children: ReactNode }) {
    const [pageTitle, setPageTitle] = useState<string>("NOT DEFINED")
    const [pageDescription, setPageDescription] = useState<string>("NOT DEFINED")

    return (
        <HeaderContext.Provider value={{
            pageTitle,
            setPageTitle,
            pageDescription,
            setPageDescription,
        }}>
            {children}
        </HeaderContext.Provider>
    )
}
