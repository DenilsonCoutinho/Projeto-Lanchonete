"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {

    const [itensCart, setItensCart] = useState([])
    const [loading, setLoading] = useState(false)
    const [cartActive, setCartActive] = useState(false)
    const [cartItensAnimate, setcartItensAnimate] = useState(false)
    useEffect(() => {
        async function updateBodyOverflow() {
            if (cartActive === true) {
                setcartItensAnimate(true);
                await new Promise((resolve) => setTimeout(resolve, 1000))
                document.body.style.overflow = 'hidden';
            } else {
                // Lógica para quando o carrinho não está ativo
            }
        }
        updateBodyOverflow()
    }, [cartActive]);

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