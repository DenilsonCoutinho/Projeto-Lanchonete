import './globals.css'
import { Open_Sans } from 'next/font/google'
import { CartProvider } from '@/context/cartContext'
import ScreenSizeContext from '@/context/screenSizeContext'
import { TriggerContextProvider } from '@/context/triggerContext'
import { ModalContextProvider } from '@/context/modalProvider'
const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Lancha ai',
  description: 'Cardápio Online',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <ModalContextProvider>
        <TriggerContextProvider>
          <ScreenSizeContext>
            <CartProvider>
              <body className={`${openSans.className} myScroll`}>
                {children}
              </body>
            </CartProvider>
          </ScreenSizeContext>
        </TriggerContextProvider>
      </ModalContextProvider>
    </html>
  )
}
