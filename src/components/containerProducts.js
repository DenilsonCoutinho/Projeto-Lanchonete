"use client"
import { useEffect, useState } from "react"
import listFood from "../listFood/listFood"
import Cart from "./cart"
import Image from "next/image"
import { useCart } from "../context/cartContext.js"
import { BiSolidDrink } from "react-icons/bi"
import { FaCheckCircle, FaHamburger, FaShoppingBag } from "react-icons/fa"
import { MdFastfood } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

import { useScreenSize } from "@/context/screenSizeContext"
import { Box, useToast } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { FaIceCream, FaPhone, FaUser } from "react-icons/fa6"
import Modal from "./modal"
import useModalContext from "@/context/modalProvider"
import OnlyLetter from "@/utils/regex/onlyLetter"
import ModalPopUp from "./modalPopUp"
import { maskPhone } from "../utils/regex/phoneMask"

export default function ContainerProduct({ items }) {
    const { setCartActive, itensCart, setItensCart, loading, setLoading, setbody } = useCart()
    const { modal, setModal, detectModal, setDetectModal } = useModalContext()
    const { modalPopUp, setModalPopUp } = useModalContext()

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
    const [pickItensExtra, setPickItensExtra] = useState([])

    const foodToFilter = listFood.filter((food) => {
        return identifyProduct?.toFilter ? food.type === identifyProduct.toFilter : food.type === 'burguer'
    })
    useEffect(() => {
        const itemsLocaStorage = JSON.parse(localStorage.getItem('userData'))
        if (itemsLocaStorage) {
            itemsLocaStorage?.map((item) => {
                return setName(item?.name), setNumber(item?.number)
            })
        } 
        localStorage.setItem('foodService', JSON.stringify([]))
        setinternalLoading(true)
    }, [])
    useEffect(() => {
        setPickItensExtra([])
    }, [modal])
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
        const uniqueItems = pickItensExtra.reduce((acc, currentItem) => {
            acc[currentItem.id] = currentItem;
            return acc;
        }, {});
        const newArrayExtra = Object.values(uniqueItems);
        let newArray = {
            id: uuidv4(),
            name: item.name,
            img: item.img,
            price: item.price * parseInt(qtdHtmlToNumber),
            originalPrice: item.price,
            qtd: parseInt(qtdHtmlToNumber),
            extra: newArrayExtra,
            comment: item?.comment
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
        if (comment) {
            lastIndex.comment = comment
        }

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
            setPickItensExtra([])
            setinternalLoading(false)
            setModal(false)
            return
        }
    }

    function lessExtra(item) {
        let qtdLessExtra = document.getElementById(`qtdExtra-${item.id}`)
        let qtd = parseInt(qtdLessExtra.innerHTML)
        if (qtd > 0) {
            qtdLessExtra.innerHTML = qtd -= 1
        } else {
            qtd = 0
        }
        let newArrayExtra = {
            ...item,
            price: item.price * qtd,
            originalPrice: item.price,
            qtd: qtd,
        }
        pickItensExtra.push(newArrayExtra)

    }
    async function moreExtra(item) {
        console.log(item.max)
        let qtdMoreExtra = document.getElementById(`qtdExtra-${item.id}`)
        let qtd = parseInt(qtdMoreExtra.innerHTML)
        qtdMoreExtra.innerHTML = qtd += 1

        if ((parseInt(qtdMoreExtra.innerHTML)) > parseInt(item?.max)) {
            qtd = 5
            return qtdMoreExtra.innerHTML = 5
        }
        let newArrayExtra = {
            ...item,
            price: item.price * qtd,
            originalPrice: item.price,
            qtd: qtd,
        }
        console.log(newArrayExtra)

        pickItensExtra.push(newArrayExtra)
    }
    
    const toast = useToast()

    async function userData() {
        const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+ [a-zA-ZÀ-ÖØ-öø-ÿ]{2,}(?: .*)?$/;
        if (regex.test(name)) {
            document.getElementById('input_name').style.border = ''
            document.getElementById('obgt_name').style.background = ''
            setCorrectName(true)
        } else {
            document.getElementById('input_name').style.border = '1px solid red'
            document.getElementById('obgt_name').style.background = 'red'
            return setCorrectName(false)
        }

        const regexTelefone = /^\d{11}$/
        if (regexTelefone.test(number.replace(/\D/g, ''))) {
            document.getElementById('input_number').style.border = ''
            document.getElementById('obgt_number').style.background = ''
            setcorrectNumber(true)
        } else {
            document.getElementById('input_number').style.border = '1px solid red'
            document.getElementById('obgt_number').style.background = 'red'
            return setcorrectNumber(false)

        }
        let allDataUsers = []

        let objFormated = {
            name: name,
            number: number,
        }
        allDataUsers.push(objFormated)
        localStorage.setItem('userData', JSON.stringify(allDataUsers))
        setModalPopUp(false)
    }
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [correctName, setCorrectName] = useState(false)
    const [correctNumber, setcorrectNumber] = useState(false)
    return (
        <ChakraProvider>
            <Cart />
            <ModalPopUp maxWidth={500}>
                <div className=" w-full flex flex-col  gap-5 items-center p-3 overflow-hidden  relative">
                    <h1 className="font-bold  text-gray-700 ">Preencha com seus dados</h1>
                    <label className="flex flex-col w-full ">
                        <div className="flex flex-row justify-between items-center ">
                            Nome e sobrenome
                            <FaCheckCircle className={`${correctName ? 'right-3 absolute ' : 'opacity-0'} text-green-500 delay-100 duration-300`} />
                            <div id="obgt_name" className={`${correctName ? ' opacity-0 ' : 'right-3 absolute '} text-white delay-100 duration-300 p-[2px] rounded-full text-xs bg-gray-400`}>Obrigatório</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-gray-300 rounded-full p-3">
                                <FaUser className="text-white" />
                            </div>
                            <input id="input_name" onChange={(e) => {
                                setName(e.target.value);
                                const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+ [a-zA-ZÀ-ÖØ-öø-ÿ]{2,}(?: .*)?$/;
                                if (regex.test(e.target.value)) {
                                    document.getElementById('input_name').style.border = ''
                                    document.getElementById('obgt_name').style.background = ''
                                    setCorrectName(true)
                                } else {
                                    document.getElementById('input_name').style.border = '1px solid red'
                                    document.getElementById('obgt_name').style.background = 'red'
                                    setCorrectName(false)
                                }
                            }} value={name} type="text" className="border outline-none w-full py-2 px-2 rounded-md" placeholder="Como vamos te chamar" />
                        </div>
                    </label>
                    <label className="flex flex-col w-full">
                        <div className="flex flex-row justify-between items-center">
                            Número do seu celular
                            <FaCheckCircle className={`${correctNumber ? 'right-3 absolute' : 'opacity-0'} text-green-500 delay-100 duration-300`} />
                            <div id="obgt_number" className={`${correctNumber ? 'opacity-0' : 'right-3 absolute '} text-white delay-100 duration-300 p-[2px] rounded-full text-xs bg-gray-400`}>Obrigatório</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-gray-300 rounded-full p-3">
                                <FaPhone className="text-white" />
                            </div>
                            <input id="input_number" maxLength={15} onChange={(e) => {
                                setNumber(maskPhone(e.target.value))
                                const regexTelefone = /^\d{11}$/
                                if (regexTelefone.test(e.target.value)) {
                                    document.getElementById('input_number').style.border = ''
                                    document.getElementById('obgt_number').style.background = ''
                                    setcorrectNumber(true)
                                } else {
                                    document.getElementById('input_number').style.border = '1px solid red'
                                    document.getElementById('obgt_number').style.background = 'red'
                                    setcorrectNumber(false)

                                }
                            }} value={number} type="text" className="border  w-full py-2 px-2 rounded-md outline-none" placeholder="(00) 00000-0000" />
                        </div>
                    </label>
                    <button onClick={() => userData()} className="py-2 bg-gray-700 w-full rounded-md text-white">Concluir</button>
                </div>
            </ModalPopUp>
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
            <button onClick={() => { setLoading(true); setCartActive(true); setbody('1') }} className='fixed z-10 select-none md:right-10 right-3 bottom-10 bg-CollorSecondaryDefault border border-white shadow-xl rounded-full p-3'>
                <FaShoppingBag className='text-CollorDefault lg:text-5xl text-3xl' />
                <div id="qtd_order" className='bg-red-600 text-white w-6 shadow-3xl -top-2 right-0 h-6 absolute rounded-full'>{somaToHTML || 0}</div>
            </button>
            <div className="max-w-[1200px] px-2  m-auto py-20">
                <div className="flex flex-wrap justify-center gap-10 items-center">
                    {
                        foodToFilter?.map((item, i) => {
                            return i < moreProductsToView && <div className="relative ">
                                {item?.id === addCart?.id && detectModal === '1' && <Modal maxWidth={1100} isback={true}>
                                    <div className="relative lg:h-full ">
                                        <div className="flex md:flex-row flex-col items-start gap-4 ">
                                            <div className="bg-white rounded-lg md:p-4 md:max-w-[600px] md:h-96 max-w-[400px] w-full lg:max-h-96 max-h-64 overflow-hidden  m-auto">
                                                <Image style={{ backgroundSize: 'cover', width: screenX > 600 ? '600px' : '', height: screenX > 600 ? '350px' : '240px' }} src={item?.img} alt={item.id} className=" lg:rounded-xl select-none " />
                                            </div>
                                            <div style={{ height: screenX < 1300 && screenX > 600 ? screenY - 200 :screenX > 1300? screenY - 290:screenY - 390 }} className="flex flex-col w-full overflow-hidden overflow-y-auto myScroll px-2">
                                                <div className="">
                                                    <div className="flex flex-col items-start ">
                                                        <h1 className="text-CollorDefault">{item?.name}</h1>
                                                        <p className="text-gray-400 font-light md:max-w-[500px] w-full lg:text-base text-xs">{item?.description}</p>
                                                        <h1 className={`text-sm font-bold  ${addCart?.id === item.id ? 'border-black' : 'text-CollorSecondaryDefault'}`}>{item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h1>
                                                        <h1 className="text-CollorDefault rounded-xl pl-1 my-5 py-3 bg-gray-100 w-full">Adicionais:</h1>
                                                        <div className="flex flex-col gap-4 w-full">
                                                            {item?.extra?.map((i) => {
                                                                return <div className="flex justify-between w-full items-center">
                                                                    <div className="flex flex-col">
                                                                        <h1 className="text-CollorDefault">
                                                                            {i?.name}
                                                                        </h1>
                                                                        <p>{i?.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                                                    </div>
                                                                    <div className="flex flex-row-reverse gap-3 items-center ">
                                                                        <div className="flex flex-row items-center border rounded-lg">
                                                                            <button onClick={() => lessExtra(i)} className={`rounded-l-2xl  flex justify-center bg-white items-center border-gray-4  w-5 h-5`}>
                                                                                -
                                                                            </button>
                                                                            <div id={`qtdExtra-${i.id}`} className={` bg-white border-l border-r border-gray-300 flex justify-center items-center w-5 h-5`}>
                                                                                {0}
                                                                            </div>
                                                                            <button onClick={() => { moreExtra(i) }} className={`bg-white flex justify-center items-center rounded-r-2xl border-gray-300 w-5 h-5 `}>
                                                                                +
                                                                            </button>
                                                                        </div>
                                                                        <Image width={100} className=" rounded-md" src={i?.img} />
                                                                    </div>
                                                                </div>
                                                            })
                                                            }
                                                        </div>
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
                                                        formatArrayToCart(item); toCart(item); toast({
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
                                <div alt={item.id} id={`itemFood-${item.id}`} onClick={() => { setAddCart(item); setModal(true); setDetectModal('1') }} key={item.id} className={`bg-white flex flex-col justify-x items-start select-none rounded-xl p-2 shadow-3xl md:w-[450px] animationToTop  md:h-[190px] `}>
                                    <div className="flex md:flex-row flex-col items-start gap-2 cursor-pointer">
                                        <div className={`relative    ${item.type === "drink" ? ' md:w-36 w-72 overflow-hidden' : 'md:w-36 w-full'} bg-white rounded-lg   h-28  pb-5`}>
                                            <Image style={{ objectFit: 'cover', width: '100%', height: item.type === "drink" ? '160%' : '130%' }} src={item.img} alt={item.name} className="cursor-pointer   lg:rounded-xl rounded-md  select-none  " />
                                        </div>
                                        <div className="flex flex-col items-start gap-2 ">
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