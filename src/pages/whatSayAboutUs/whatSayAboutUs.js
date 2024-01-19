'use client'
import Image from 'next/image'
import hamburguer from '../../assets/whatSayAboutUs/pngwing.com (3).png'
import people from '../../assets/whatSayAboutUs/3177440.png'
import { FaStar } from 'react-icons/fa6'
import { useState } from 'react'
export default function WhatSayAboutUs() {
    const [positionComent, setPositionComent] = useState(1)
    const comments = [
        {
            id: 1,
            name: 'Ana castelo',
            text: ' O atendimento ao cliente é notável pela sua eficiência e cordialidade. A equipe demonstra conhecimento sobre o cardápio, oferece recomendações e está pronta para atender a qualquer solicitação especial dos clientes. Esse toque personalizado contribui para uma experiência gastronômica mais agradável.'
        },
        {
            id: 2,
            name: 'João Santos',
            text: 'A qualidade dos ingredientes é evidente nos hambúrgueres servidos. A carne é suculenta, os vegetais frescos e os molhos caseiros adicionam um toque especial a cada mordida. A preocupação com a qualidade dos insumos contribui para a construção de sabores autênticos.'
        },
        {
            id: 3,
            name: 'Salvado A.',
            text: 'Destaca-se a diversidade de opções no cardápio, que vai além dos tradicionais hambúrgueres. Desde opções vegetarianas até combinações inovadoras de ingredientes, a hamburgueria oferece uma variedade que agrada a diferentes paladares, proporcionando uma experiência culinária mais ampla.'
        },
        {
            id: 4,
            name: 'Sales Santos',
            text: 'Apesar da alta qualidade dos pratos oferecidos, os preços são justos e proporcionais à experiência gastronômica proporcionada. A relação custo-benefício é equilibrada, o que faz da hamburgueria uma escolha atrativa para quem busca uma refeição de qualidade sem comprometer o orçamento.'
        },

    ]
    return (
        <div id='comments' className="lg:pt-28 max-w-[1200px] m-auto px-3">
            <div className='flex justify-between items-start'>
                <Image src={hamburguer} height={400} className='lg:flex hidden' />
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col  lg:items-start items-center'>
                        <p className='text-CollorSecondaryDefault font-bold'>Depoimentos</p>
                        <h1 className='lg:text-3xl text-2xl text-CollorDefault lg:text-left text-center font-medium'>O que dizem sobre nós?</h1>
                    </div>
                    <div className='flex flex-col lg:items-start justify-center items-center overflow-hidden'>
                        {comments.map((items) => {
                            return items.id === positionComent && <div key={items.id} className='flex items-start gap-4 focus-in-expand'>
                                <div className='w-16 rounded-full md:flex hidden bg-white'>
                                    <Image src={people} className='' />
                                </div>
                                <div className='flex flex-col items-start'>
                                    <h1 className='text-CollorDefault text-xl'>{items.name}</h1>
                                    <div className='flex items-start'>
                                        <FaStar className='text-CollorSecondaryDefault' />
                                        <FaStar className='text-CollorSecondaryDefault' />
                                        <FaStar className='text-CollorSecondaryDefault' />
                                        <FaStar className='text-CollorSecondaryDefault' />
                                        <FaStar className='text-CollorSecondaryDefault' />
                                    </div>
                                    <p className='text-CollorDefault mt-2 lg:w-96 h-36 overflow-hidden shadow-innerShadow overflow-y-auto rounded-lg myScroll px-2'>
                                        {items.text}
                                    </p>
                                </div>
                            </div>
                        })}
                        <div className='flex items-center gap-6'>
                            {comments.map((items, i) => {
                                return <button onClick={() => {setPositionComent(i + 1)}} className={`hover:shadow-inner ${items.id === positionComent ? 'bg-CollorSecondaryDefault' : 'bg-white'} hover:bg-CollorSecondaryDefault duration-200 mt-2 py-1 px-4 rounded-lg shadow-xl  `}>{i + 1}</button>
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}