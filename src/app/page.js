"use client"
import ContainerProduct from '@/components/containerProducts.js'
import Header from '../components/header.js'

import Presentation from '../pages/presentation/page.js'
import ServicePage from '../pages/servicesPage/page.js'
import { InteractiveScroll } from '@/utils/interactiveScroll.js'
export default function Home() {
  return (
    <main className="">
      <InteractiveScroll />
      <Header />
      <Presentation />
      <ServicePage />
      <ContainerProduct />
    </main>
  )
}
