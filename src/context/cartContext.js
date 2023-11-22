"use client"
import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {

    const [itensCart, setItensCart] = useState([])
    const [loading, setLoading] = useState(false)
    const [cartActive, setCartActive] = useState(false)
    const [ cartItensAnimate, setcartItensAnimate] = useState(false)
   
    return <CartContext.Provider value={{
        itensCart,
        setItensCart,
        cartActive,
        setCartActive,
        loading, setLoading,
        cartItensAnimate, setcartItensAnimate
    }}>
        {children}
    </CartContext.Provider>
}

export function useCart() {
    return useContext(CartContext)
}