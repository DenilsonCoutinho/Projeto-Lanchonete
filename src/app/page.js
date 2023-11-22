"use client"
import Header from '../components/header.js'

import MenuFood from '../pages/menuFood/page.js'
import Presentation from '../pages/presentation/page.js'
import ServicePage from '../pages/servicesPage/page.js'
export default function Home() {
  return (
    <main className="">
      <Header />
      <Presentation />
      <ServicePage />
      <MenuFood />
    </main>
  )
}
