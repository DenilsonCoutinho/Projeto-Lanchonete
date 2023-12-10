'use client'
import React, { createContext, useState, useContext } from 'react'

const ModalContext = createContext()

export function ModalContextProvider({ children }) {

    const [modal, setModal] = useState(false)
    const [modalPopUp, setModalPopUp] = useState(false)

    return <ModalContext.Provider
        value={{
            modal,
            setModal,
            modalPopUp,
            setModalPopUp
        }}>
        {children}
    </ModalContext.Provider>
}

export default function useModalContext() {
    return useContext(ModalContext)
}
