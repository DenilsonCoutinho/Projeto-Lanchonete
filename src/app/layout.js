import './globals.css'
import { Open_Sans } from 'next/font/google'
import { CartProvider } from '@/context/cartContext'
import ScreenSizeContext from '@/context/screenSizeContext'
const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Lancha ai',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <ScreenSizeContext>
        <CartProvider>
          <body className={openSans.className}>
            {children}
          </body>
        </CartProvider>
      </ScreenSizeContext>
    </html>
  )
}
