'use client'
import React, { createContext, useState, useContext } from 'react'

const TriggerContext = createContext()

export function TriggerContextProvider({ children }) {

    const [startCountingAnimation, setStartCountingAnimation] = useState(false)
    const [displayMenuMobile, setdisplayMenuMobile] = useState(false)
    const [showModal, setShowModal] = useState(false)

    return <TriggerContext.Provider

        value={{
            startCountingAnimation,
            setStartCountingAnimation,
            displayMenuMobile, 
            setdisplayMenuMobile,
            showModal,setShowModal
        }}>
        {children}
    </TriggerContext.Provider>
}

export default function useTriggerContext() {
    return useContext(TriggerContext)
}
