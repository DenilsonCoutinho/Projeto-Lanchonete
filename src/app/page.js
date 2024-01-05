"use client"
import ContainerProduct from '@/components/containerProducts.js'

import Header from '../components/header.js'
import Footer from '../components/footer.js'

import Presentation from '../pages/presentation/page.js'
import ServicePage from '../pages/servicesPage/page.js'
import WhatSayAboutUs from '@/pages/whatSayAboutUs/whatSayAboutUs.js'

import { InteractiveScroll } from '@/utils/interactiveScroll.js'
export default function Home() {
  return (
    <main className="">
      <InteractiveScroll />
      <Header />
      <Presentation />
      <ServicePage />
      <ContainerProduct />
      <WhatSayAboutUs />
      <Footer />
    </main>
  )
}
