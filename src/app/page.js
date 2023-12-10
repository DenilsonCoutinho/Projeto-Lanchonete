"use client"
import ContainerProduct from '@/components/containerProducts.js'
import Header from '../components/header.js'

import Presentation from '../pages/presentation/page.js'
import ServicePage from '../pages/servicesPage/page.js'
import { InteractiveScroll } from '@/utils/interactiveScroll.js'
import WhatSayAboutUs from '@/pages/whatSayAboutUs/whatSayAboutUs.js'
import Footer from '@/components/footer.js'
import ModalPopUp from '@/components/modalPopUp.js'
export default function Home() {
  return (
    <main className="">
      <InteractiveScroll />
      <ModalPopUp />
      <Header />
      <Presentation />
      <ServicePage />
      <ContainerProduct />
      <WhatSayAboutUs />
      <Footer />
    </main>
  )
}
