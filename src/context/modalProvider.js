'use client'
import React, { createContext, useState, useContext } from 'react'

const ModalContext = createContext()

export function ModalContextProvider({ children }) {

    const [modal, setModal] = useState(false)

    return <ModalContext.Provider
        value={{
            modal,
            setModal,
        }}>
        {children}
    </ModalContext.Provider>
}

export default function useModalContext() {
    return useContext(ModalContext)
}
