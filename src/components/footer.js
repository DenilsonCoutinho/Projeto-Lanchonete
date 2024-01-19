import Image from 'next/image'
import logo from '../assets/logotipo-personalizado-mesa.jpg'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa6'
import Link from 'next/link'
export default function Footer() {
    return (
        <div className="h-20 pt-28 ">
            <div className='bg-white'>
                <div className=" max-w-[1200px] m-auto flex md:flex-row gap-4 flex-col justify-between items-center px-3">
                    <Image src={logo} height={80} alt='logo'/>
                    <h1 className='text-CollorDefault text-center'><strong className='text-CollorDefault'>Cardápio On-line</strong> ® Todos os direitos reservados</h1>
                    <div className='flex'>
                        <div className='bg-white px-1 py-1 flex items-center gap-3'>
                            <FaInstagram />
                            <FaFacebook />
                           <Link href={'/about'}><FaWhatsapp /></Link> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}