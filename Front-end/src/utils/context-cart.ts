import { createContext } from 'react'

export type ContextCartCountType = {
    contextCartCount: number;
    setContextCartCount: (ContextCartCount: number) => void
}

export const ContextCartCount = createContext<ContextCartCountType>({
    contextCartCount: 0,
    setContextCartCount: () => {}
})

