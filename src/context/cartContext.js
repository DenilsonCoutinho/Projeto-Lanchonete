"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {

    const [itensCart, setItensCart] = useState([])
    const [cartActive, setCartActive] = useState(false)
   
    return <CartContext.Provider value={{
        itensCart,
        setItensCart,
        cartActive,
        setCartActive
    }}>
        {children}
    </CartContext.Provider>
}

export function useCart() {
    return useContext(CartContext)
}