"use client"
import Cart from '@/components/cart'
import Header from '@/components/header'

import MenuFood from '@/pages/menuFood/page'
import Presentation from '@/pages/presentation/page'
import ServicePage from '@/pages/servicesPage/page'

import { useCart } from '@/context/cartContext'

import { FaShoppingBag } from 'react-icons/fa'

export default function Home() {
  const { cartActive, setCartActive, itensCart } = useCart()
  return (
    <main className="">
      <Header />
      <Presentation />
      <ServicePage />
      <MenuFood />
    </main>
  )
}
