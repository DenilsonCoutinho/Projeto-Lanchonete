"use client"
import { useEffect, useState } from "react"
import listFood from "../listFood/listFood"
import Cart from "./cart"
import Image from "next/image"
import { useCart } from "../context/cartContext.js"
import { BiSolidDrink } from "react-icons/bi"
import { FaCheckCircle, FaHamburger, FaShoppingBag } from "react-icons/fa"
import { MdFastfood } from "react-icons/md";

import { useScreenSize } from "@/context/screenSizeContext"
import { Box, useToast } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { FaIceCream } from "react-icons/fa6"
import Modal from "./modal"
import useModalContext from "@/context/modalProvider"
import OnlyLetter from "@/utils/regex/onlyLetter"

export default function ContainerProduct({ items }) {
    const { setCartActive, itensCart, setItensCart, loading, setLoading, setbody } = useCart()
    const { modal, setModal } = useModalContext()
    const { screenX, screenY } = useScreenSize()
    const [addCart, setAddCart] = useState()
    const [attCart, setAttCart] = useState([])
    const [somaToHTML, setsomaToHTML] = useState()
    const [validadeInput, setValidadeInput] = useState()
    const [comment, setComment] = useState('')
    const [internalLoading, setinternalLoading] = useState(false)
    const menuOptions = [
        {
            id: 1,
            icon: <FaHamburger />,
            name: "Burguers",
            toFilter: "burguer"
        }
        ,
        {
            id: 2,
            icon: <BiSolidDrink />,
            name: "Bebidas",
            toFilter: "drink"
        },
        {
            id: 3,
            icon: <MdFastfood />,
            name: "Combos",
            toFilter: "comb"
        },
        {
            id: 4,
            icon: <FaIceCream />,
            name: "Açai",
            toFilter: "acai"
        },

    ]
    const [buttonSelected, setButtonSelected] = useState(1)
    const [identifyProduct, setIdentifyProduct] = useState()
    const [moreProductsToView, setMoreProductsToView] = useState(4)

    const foodToFilter = listFood.filter((food) => {
        return identifyProduct?.toFilter ? food.type === identifyProduct.toFilter : food.type === 'burguer'
    })
    useEffect(() => {
        const itemsLocaStorage = JSON.parse(localStorage.getItem('foodService'))
        localStorage.setItem('foodService', JSON.stringify(itemsLocaStorage || []))
        setinternalLoading(true)
    }, [])

    useEffect(() => {
        prevFood()

    }, [loading])

    useEffect(() => {
        let getQtd = JSON.parse(localStorage.getItem('foodService'))
        let qtdToCart = getQtd?.map((i) => {
            return i?.qtd
        })

        let soma = qtdToCart?.reduce((acumulador, valorAtual) => {
            return acumulador + valorAtual;
        }, 0);
        setsomaToHTML(soma)
    }, [loading])

    useEffect(() => {

        let qtdHtmlMore = document.getElementById(`qtd_Food-${addCart?.id}`)
        let qtdAddCart = document.getElementById(`qtd_Orders-${addCart?.id}`)
        setValidadeInput(parseInt(qtdHtmlMore?.innerHTML))
        if (parseInt(qtdHtmlMore?.innerHTML) > 0) {
            qtdAddCart.style.transition = '0.3s'
            qtdAddCart.style.background = '#FCB040'
            qtdAddCart.style.boxShadow = ''
            document.getElementById(`qtd_Orders-${addCart?.id}`).disabled = false;

        } else if (parseInt(qtdHtmlMore?.innerHTML) < 1) {
            document.getElementById(`qtd_Orders-${addCart?.id}`).disabled = true;
            qtdAddCart.style.background = 'transparent'
        }

    }, [internalLoading])

    async function moreQuantityFood(item) {
        let qtdHtmlMore = document.getElementById(`qtd_Food-${item.id}`)
        let qtdHtmlMoreToNumber = parseInt(qtdHtmlMore.innerHTML)
        setinternalLoading(true)
        await new Promise(resolve => setTimeout(resolve, 100))
        qtdHtmlMore.innerHTML = qtdHtmlMoreToNumber + 1
        setinternalLoading(false)
    }

    async function lessQuantityFood(item) {
        let qtdHtml = document.getElementById(`qtd_Food-${item.id}`)
        let qtdHtmlToNumber = parseInt(qtdHtml.innerHTML)
        console.log(qtdHtmlToNumber)
        if (qtdHtmlToNumber > 0) {
            setinternalLoading(true)
            await new Promise(resolve => setTimeout(resolve, 100))
            qtdHtml.innerHTML = qtdHtmlToNumber - 1
            setinternalLoading(false)
        } else {
            qtdHtmlToNumber = 0
        }
    }

    async function prevFood() {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 100))
        setAttCart(itensCart)
        await new Promise(resolve => setTimeout(resolve, 100))
        setLoading(false)
    }

    let toCartOrder = []

    function formatArrayToCart(item) {

        let qtdHtml = document.getElementById(`qtd_Food-${item?.id}`)
        let qtdHtmlToNumber = parseInt(qtdHtml?.innerHTML)
        let newArray = {
            id: item.id,
            name: item.name,
            img: item.img,
            price: item.price * parseInt(qtdHtmlToNumber),
            originalPrice: item.price,
            qtd: parseInt(qtdHtmlToNumber),
            comment: item.comment
        }
        if (qtdHtmlToNumber > 0) {
            toCartOrder.push(newArray)

        }
    }
    async function toCart(item) {
        setinternalLoading(true)
        let lastIndex = toCartOrder[toCartOrder.length - 1]
        let qtdHtmlMore = document.getElementById(`qtd_Food-${item.id}`)
        let qtdFoodHtml = document.getElementById(`qtd_order`)
        lastIndex.comment = comment
        if (parseInt(qtdHtmlMore.innerHTML) > 0) {

            await new Promise((resolve) => setTimeout(resolve, 100))
            attCart?.push(lastIndex);
            setLoading(true)
            localStorage.setItem('foodService', JSON.stringify(attCart));
            let itenStorage = JSON.parse(localStorage.getItem('foodService'))
            setItensCart(itenStorage)
            setLoading(false)
            let qtdToCart = itenStorage?.map((item) => {
                return item?.qtd
            })
            const soma = qtdToCart?.reduce((acumulador, valorAtual) => {
                return acumulador + valorAtual;
            }, 0);

            qtdFoodHtml.innerHTML = soma
            qtdHtmlMore.innerHTML = 0
            setComment('')
            setinternalLoading(false)
            setModal(false)
            return
        }
    }

    const toast = useToast()

    return (
        <ChakraProvider>
            <Cart />
            <div id="menu" className="pt-28 max-w-[1200px] m-auto">
                <p className="text-CollorSecondaryDefault uppercase tracking-wide text-center font-semibold ">Cardápio</p>
                <h1 className="text-CollorDefault text-center font-bold text-3xl ">Nosso Cardápio</h1>
                <div>
                    <div className="pt-20 max-w-[1000px] flex justify-center m-auto  py-1">
                        <div id="filter" className="flex flex-row  items-center gap-4 max-w-[1000px] overflow-x-auto bg-[#fdf7e7]  myScroll py-1 px-2">
                            {
                                menuOptions?.map((item, i) => {
                                    return <button key={item.id} onClick={() => { setButtonSelected(item.id); setIdentifyProduct(item) }} className={`select-none flex ${i % 2 === 0 ? 'animatedElementLeft' : 'animatedElementRight'} items-center removeBlue w-28 text-center justify-center py-2 px-2  gap-2 ${buttonSelected === item.id ? 'bg-CollorSecondaryDefault' : 'bg-white'} shadow-xl rounded-2xl`}>
                                        <p className=" text-black">{item.icon}</p>
                                        <p className=" text-black">{item.name}</p>
                                    </button>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <button  onClick={() => { setLoading(true); setCartActive(true); setbody('1') }} className='fixed z-10 select-none md:right-10 right-3 bottom-10 bg-CollorSecondaryDefault border border-white shadow-xl rounded-full p-3'>
                <FaShoppingBag className='text-CollorDefault lg:text-5xl text-3xl' />
                <div id="qtd_order" className='bg-red-600 text-white w-6 shadow-3xl -top-2 right-0 h-6 absolute rounded-full'>{somaToHTML || 0}</div>
            </button>
            <div className="max-w-[1200px] px-2  m-auto py-20">
                <div className="flex flex-wrap justify-center gap-10 items-center">
                    {
                        foodToFilter?.map((item, i) => {

                            return i < moreProductsToView && <div className="relative ">
                                {item?.id === addCart?.id && <Modal>
                                    <div className="relative lg:h-full ">
                                        <div className="flex lg:flex-row flex-col items-start gap-4 ">
                                            <div className="bg-white rounded-lg md:p-4 lg:max-w-[600px] lg:h-96 max-w-[400px] w-full lg:max-h-96 max-h-64 overflow-hidden  m-auto">
                                                <Image style={{ backgroundSize: 'cover', width: '100%', height: '100%' }} src={item?.img} alt={item.id} className=" lg:rounded-xl select-none " />
                                            </div>
                                            <div style={{ height: screenX < 1300 && screenX > 600 ? screenY - 290 : screenY - 390 }} className="flex flex-col w-full overflow-hidden overflow-y-auto myScroll px-2">
                                                <div className="">
                                                    <div className="flex flex-col items-start ">
                                                        <h1 className="text-CollorDefault">{item?.name}</h1>
                                                        <p className="text-gray-400 font-light md:max-w-[500px] w-full lg:text-base text-xs">{item?.description}</p>
                                                        <h1 className={`text-sm font-bold  ${addCart?.id === item.id ? 'border-black' : 'text-CollorSecondaryDefault'}`}>{item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h1>
                                                        {/* <h1 className="text-CollorDefault">Extra:</h1> */}
                                                        {/* <div className="flex flex-col">
                                                            {item.extra.map((i) => {
                                                                return <h1>
                                                                    { i.item.name }  
                                                                </h1>
                                                            })
                                                            }
                                                        </div> */}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start gap-4 mt-5 py-4 ">
                                                    <h1 className="text-CollorDefault text-sm">Alguma observação?</h1>
                                                    <textarea onChange={(e) => setComment(OnlyLetter(e.target.value))} value={comment} placeholder="Ex: Tirar picles" className="max-h-32 text-sm p-3 outline-none w-full border rounded-lg">
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="h-20 rounded-b-sm px-2">
                                            {
                                                addCart?.id === item.id && <div className="flex flex-row md:justify-end justify-center items-center gap-2 pt-2">
                                                    <div className="flex flex-row items-center border rounded-lg">
                                                        <button onClick={() => lessQuantityFood(item)} className={`rounded-l-2xl  flex justify-center bg-white items-center border-gray-4  w-10 h-10`}>
                                                            -
                                                        </button>
                                                        <div id={`qtd_Food-${item.id}`} className={` bg-white border-l border-r border-gray-300 flex justify-center items-center w-10 h-10`}>
                                                            {1}
                                                        </div>
                                                        <button onClick={() => moreQuantityFood(item)} className={`bg-white flex justify-center items-center rounded-r-2xl border-gray-300 w-10 h-10 `}>
                                                            +
                                                        </button>
                                                    </div>
                                                    {validadeInput > 0 ? <button id={`qtd_Orders-${item.id}`} onClick={() => {
                                                        formatArrayToCart(item); toCart(item); setModal(false); toast({
                                                            position: 'top-right',
                                                            duration: 4500,
                                                            render: () => (
                                                                <Box className=" lg:translate-y-0 translate-y-28 rounded-md flex items-center gap-3" color='white' p={3} bg='green.400'>
                                                                    <FaCheckCircle className="text-white" /> Pedido adicionado a sacola
                                                                </Box>
                                                            ),
                                                        })
                                                    }} className={`bg-CollorSecondaryDefault  flex items-center gap-2 rounded-lg px-2  h-10`}>
                                                        <FaShoppingBag id={`iconCart-${item.id}`} className={`${addCart?.id === item.id ? 'text-black' : 'text-CollorSecondaryDefault'} `} />
                                                        <p className="text-black">Adicionar</p>
                                                    </button>
                                                        : <button id={`qtd_Orders-${item.id}`} onClick={() => {
                                                            formatArrayToCart(item); toCart(item); toast({
                                                                position: 'top-right',
                                                                duration: 4500,
                                                                render: () => (
                                                                    <Box className=" lg:translate-y-0 translate-y-28 rounded-md flex items-center gap-3" color='white' p={3} bg='green.400'>
                                                                        <FaCheckCircle className="text-white" /> Pedido adicionado a sacola
                                                                    </Box>
                                                                ),
                                                            })
                                                        }} className={`bg-CollorSecondaryDefault h-10 flex items-center gap-2 rounded-lg  px-2 `}>
                                                            <FaShoppingBag id={`iconCart-${item.id}`} className={`${addCart?.id === item.id ? 'text-black' : 'text-CollorSecondaryDefault'}`} />
                                                            <p className="text-black">Adicionar</p>
                                                        </button>}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </Modal>}
                                <div alt={item.id} id={`itemFood-${item.id}`} onClick={() => { setAddCart(item); setModal(true) }} key={item.id} className={`bg-white flex flex-col justify-x items-start select-none rounded-xl p-2 shadow-3xl md:w-[450px] animationToTop  md:h-[190px] `}>
                                    <div className="flex md:flex-row flex-col items-start gap-2 cursor-pointer">
                                        <div className={`relative   overflow-hidden ${item.type === "drink" ? ' w-64' : 'md:w-36 w-full'} bg-white rounded-lg  lg:h-20 h-28  pb-5`}>
                                            <Image style={{ objectFit: 'cover', width: '100%', height: '140%' }} src={item.img} alt={item.name} className="cursor-pointer   lg:rounded-xl rounded-md  select-none  " />
                                        </div>
                                        <div className="flex flex-col items-start gap-1 ">
                                            <h1 className="text-sm ">{item.name.substring(0, 25)}</h1>
                                            <h1 className={`text-sm font-bold  ${addCart?.id === item.id ? 'text-CollorSecondaryDefault' : 'text-CollorSecondaryDefault'}`}>{item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h1>
                                            {
                                                screenX < 700 ?
                                                    <h1 className={`md:text-xs  text-[10px] w-full `}>{item.description}</h1>
                                                    :
                                                    <h1 className="text-xs md:w-64 overflow-hidden h-20 myScrollContainer ">{item.description}</h1>
                                            }
                                        </div>
                                    </div>

                                    {/* {
                                        addCart?.id === item.id && <div className="flex flex-row justify-between items-start gap-2 pt-2">
                                            <div className="flex flex-row items-center">
                                                <button onClick={() => lessQuantityFood(item)} className={`rounded-l-2xl  flex justify-center bg-white items-center border-gray-4  w-10 h-6`}>
                                                    -
                                                </button>
                                                <div id={`qtd_Food-${item.id}`} className={` bg-white border-l border-r border-gray-300 flex justify-center items-center w-10 h-6`}>
                                                    {0}
                                                </div>
                                                <button onClick={() => moreQuantityFood(item)} className={`bg-white flex justify-center items-center rounded-r-2xl border-gray-300 w-10 h-6 `}>
                                                    +
                                                </button>
                                            </div>
                                            {validadeInput > 0 ? <button id={`qtd_Orders-${item.id}`} onClick={() => {
                                                formatArrayToCart(item); toCart(item); toast({
                                                    position: 'top-right',
                                                    duration: 4500,
                                                    render: () => (
                                                        <Box className=" lg:translate-y-0 translate-y-28 rounded-md flex items-center gap-3" color='white' p={3} bg='green.400'>
                                                            <FaCheckCircle className="text-white" /> Pedido adicionado a sacola
                                                        </Box>
                                                    ),
                                                })
                                            }} className={`  flex items-center gap-2 rounded-2xl px-2 `}>
                                                <FaShoppingBag id={`iconCart-${item.id}`} className={`${addCart?.id === item.id ? 'text-black' : 'text-CollorSecondaryDefault'}`} />
                                                <p className="text-black">Adicionar</p>
                                            </button>
                                                : <button id={`qtd_Orders-${item.id}`} onClick={() => { formatArrayToCart(item); toCart(item); }} className={`  flex items-center gap-2 rounded-2xl px-2 `}>
                                                    <FaShoppingBag id={`iconCart-${item.id}`} className={`${addCart?.id === item.id ? 'text-black' : 'text-CollorSecondaryDefault'}`} />
                                                    <p className="text-black">Adicionar</p>
                                                </button>}
                                        </div>
                                    } */}
                                </div>
                            </div>
                        })
                    }
                </div>
                {foodToFilter.length > moreProductsToView ?
                    <button onClick={() => setMoreProductsToView((prev) => prev + 1)} className="mt-2 px-5 py-2 bg-white rounded-2xl shadow-lg m-auto flex justify-center text-black">Ver mais</button>
                    :
                    <></>
                }
            </div >
        </ChakraProvider >
    )
}