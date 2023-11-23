"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
const ScreenContext = createContext()

export default function ScreenSizeContext({ children }) {
    const [screenX, setScreenX] = useState(0);
    const [screenY, setScreenY] = useState(0);
    
    useEffect(() => {
        setScreenX(window.innerWidth)
        setScreenY(window.innerHeight)
    }, [])
    useEffect(() => {
        function getScreenX() {
            setScreenX(window.innerWidth)
            setScreenY(window.innerHeight)
        }
        window.addEventListener('resize', getScreenX);
        return () => {
            window.removeEventListener('resize', getScreenX);
        };
    }, [])
    return <ScreenContext.Provider value={{
        screenX, setScreenX,
        screenY, setScreenY,
       
    }}>
        {children}
    </ScreenContext.Provider>
}

export function useScreenSize() {
    return useContext(ScreenContext)
}