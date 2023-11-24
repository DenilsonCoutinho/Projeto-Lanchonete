'use client'
import Image from 'next/image'
import Logo from '../assets/logotipo-personalizado-mesa.jpg'
import { FaShoppingBag } from 'react-icons/fa'
import { IoIosMenu } from "react-icons/io";
import { useCart } from '@/context/cartContext';
import { useEffect, useState } from 'react';
import { MdClose } from "react-icons/md";

export default function Header() {
    const { setCartActive,loading,itensCart } = useCart()
    const [HeaderActive, setHeaderActive] = useState(false)
    const [headerActiveAnimation, setHeaderActiveAnimation] = useState(false)

    async function animationCart() {
        if (HeaderActive) {
            await new Promise((resolve => setTimeout(resolve, 100)))
            setHeaderActiveAnimation(true)
            document.body.style.overflow = 'hidden';
        } else {
            if (typeof window !== 'undefined') {

                document.body.style.overflow = 'auto';
            }
        }

    }

    useEffect(() => {
        const itemsLocaStorage = JSON.parse(localStorage.getItem('foodService'))
        localStorage.setItem('foodService', JSON.stringify(itemsLocaStorage))
        let qtd = document.getElementById('qtd_Header')
        let qtdToInt = parseInt(qtd.innerHTML)
        let pickLength = itemsLocaStorage?.map((item) => {
            return item?.qtd
        })
        const soma = pickLength?.reduce((acumulador, valorAtual) => {
            return acumulador + valorAtual;
        }, 0);
        qtdToInt = qtd.innerHTML = soma || 0
    }, [loading,itensCart])
    animationCart()
    return (
        <>
            <div className='All_Menu_Pc md:flex hidden'>
                <div className='flex items-center justify-between max-w-[1000px] m-auto lg:gap-20 gap-10 pt-5'>
                    <div className='shadow-3xl rounded-full w-20 h-20 overflow-hidden'>
                        <Image alt=' logo' src={Logo} />
                    </div>
                    <div className='flex items-center  lg:gap-14 gap-7 '>
                        <p className='text-CollorDefault'>Reservas</p>
                        <p className='text-CollorDefault'>Serviços</p>
                        <p className='text-CollorDefault'>Cardápio</p>
                        <p className='text-CollorDefault'>Depoimentos</p>
                    </div>
                    <button onClick={() => setCartActive(true)} className='bg-white removeBlue px-3 py-3 shadow-3xl rounded-3xl flex items-center gap-2'>
                        <p className='text-CollorDefault'> Meu Carrinho</p>
                        <div className='bg-CollorSecondaryDefault rounded-2xl p-1 relative'>
                            <div id='qtd_Header' className='h-4 w-4 bg-red-600 absolute flex items-center justify-center text-white text-xs rounded-full -top-2 -right-2'>{0}</div>
                            <FaShoppingBag className='text-CollorDefault' />
                        </div>
                    </button>
                </div>
            </div>
            <div className='md:hidden flex fixed w-full shadow-2xl'>
                <div className='bg-white px-3 h-28 flex justify-between items-center w-full'>
                    <div className='shadow-3xl rounded-full w-20 h-20 overflow-hidden'>
                        <Image src={Logo} />
                    </div>
                    {
                        HeaderActive ?
                            <MdClose onClick={() => { setHeaderActive(false); setHeaderActiveAnimation(false) }} className='text-3xl' />
                            :
                            <IoIosMenu className='text-3xl' onClick={() => setHeaderActive(true)} />
                    }
                </div>
            </div>
            {HeaderActive && <div className={` bg-white flex items-start pt-10 mt-28 justify-center border-t z-[9999] h-full w-full duration-150 fixed  ${headerActiveAnimation ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='flex flex-col items-center gap-10'>
                    <div onClick={() => setCartActive(true)} className='bg-white px-3 py-3 shadow-3xl rounded-3xl flex items-center gap-2'>
                        <p className='text-CollorDefault'> Meu Carrinho</p>
                        <div className='bg-CollorSecondaryDefault rounded-2xl p-1'>
                            <FaShoppingBag className='text-CollorDefault' />
                        </div>
                    </div>
                    <h1 className='text-CollorDefault text-xl'>
                        Reservas
                    </h1>
                    <h1 className='text-CollorDefault text-xl'>
                        Serviços
                    </h1>
                    <h1 className='text-CollorDefault text-xl'>
                        Cardápio
                    </h1>
                    <h1 className='text-CollorDefault text-xl'>
                        Depoimentos
                    </h1>

                </div>
            </div>}
        </>
    )
}