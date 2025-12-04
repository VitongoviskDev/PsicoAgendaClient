"use client"

import { useContext } from "react"
import { HeaderContext } from "@/context/headerContext"

export function useHeaderContext() {
    const ctx = useContext(HeaderContext)
    if (!ctx) {
        throw new Error("useHeader must be used inside <HeaderProvider>")
    }
    return ctx
}
