"use client"
import Image from "next/image"
import listFood from "../listFood/listFood"
import { useEffect, useState } from "react"
import { FaHamburger, FaShoppingBag } from "react-icons/fa"
import { useCart } from "../context/cartContext.js"
import Cart from "./cart"
import { BiSolidDrink } from "react-icons/bi"
import { useScreenSize } from "@/context/screenSizeContext"

export default function ContainerProduct({ items }) {
    const { setCartActive, itensCart, loading, setLoading , setbody} = useCart()
    const { screenY } = useScreenSize()
    const [addCart, setAddCart] = useState()
    const [attCart, setAttCart] = useState([])
    const [somaToHTML, setsomaToHTML] = useState()
    const [iternalLoading, setiternalLoading] = useState(false)
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

    ]
    const [buttonSelected, setButtonSelected] = useState(1)
    const [identifyProduct, setIdentifyProduct] = useState()

    const foodToFilter = listFood.filter((food) => {
        return identifyProduct?.toFilter ? food.type === identifyProduct.toFilter : food.type === 'burguer'
    })
    useEffect(() => {
        let clickOn = document.getElementById(`itemFood-${1}`)
        clickOn?.click()
        // localStorage.setItem('foodService', JSON.stringify([]))
        setiternalLoading(true)
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
        if (parseInt(qtdHtmlMore?.innerHTML) > 0) {
            qtdAddCart.style.transition = '0.3s'
            qtdAddCart.style.background = '#fff	'
            qtdAddCart.style.boxShadow = ''
            document.getElementById(`qtd_Orders-${addCart?.id}`).disabled = false;

        } else if (parseInt(qtdHtmlMore?.innerHTML) < 1) {
            document.getElementById(`qtd_Orders-${addCart?.id}`).disabled = true;
            qtdAddCart.style.background = '#FCB040	'
        }
    }, [iternalLoading])

    async function moreQuantityFood(item) {
        let qtdHtmlMore = document.getElementById(`qtd_Food-${item.id}`)
        let qtdHtmlMoreToNumber = parseInt(qtdHtmlMore.innerHTML)
        setiternalLoading(true)
        await new Promise(resolve => setTimeout(resolve, 100))
        qtdHtmlMore.innerHTML = qtdHtmlMoreToNumber + 1
        setiternalLoading(false)
    }

    async function lessQuantityFood(item) {
        let qtdHtml = document.getElementById(`qtd_Food-${item.id}`)
        let qtdHtmlToNumber = parseInt(qtdHtml.innerHTML)
        console.log(qtdHtmlToNumber)
        if (qtdHtmlToNumber > 0) {
            setiternalLoading(true)
            await new Promise(resolve => setTimeout(resolve, 100))
            qtdHtml.innerHTML = qtdHtmlToNumber - 1
            setiternalLoading(false)
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
        }
        if (qtdHtmlToNumber > 0) {
            toCartOrder.push(newArray)

        }
    }

    async function toCart(item) {
        setiternalLoading(true)
        let lastIndex = toCartOrder[toCartOrder.length - 1]
        let qtdHtmlMore = document.getElementById(`qtd_Food-${item.id}`)
        let qtdFoodHtml = document.getElementById(`qtd_order`)

        if (parseInt(qtdHtmlMore.innerHTML) > 0) {

            await new Promise((resolve) => setTimeout(resolve, 100))
            attCart?.push(lastIndex);
            console.log(attCart)
            setLoading(true)
            localStorage.setItem('foodService', JSON.stringify(attCart));
            let itenStorage = JSON.parse(localStorage.getItem('foodService'))
            setLoading(false)
            let qtdToCart = itenStorage?.map((item) => {
                return item?.qtd
            })
            const soma = qtdToCart?.reduce((acumulador, valorAtual) => {
                return acumulador + valorAtual;
            }, 0);

            qtdFoodHtml.innerHTML = soma
            qtdHtmlMore.innerHTML = 0
            setiternalLoading(false)

            return
        }

    }

    return (
        <div>
            <Cart  />
            <div className="pt-28 max-w-[1200px] m-auto">
                <p className="text-CollorSecondaryDefault uppercase tracking-wide text-center font-semibold">Cardápio</p>
                <h1 className="text-CollorDefault   text-center font-bold text-3xl">Nosso Cardápio</h1>
                <div>
                    <div className="pt-20 max-w-[1000px] flex justify-center m-auto">
                        <div className="flex flex-row items-center gap-4">
                            {
                                menuOptions.map((item, i) => {
                                    return <button key={item.id} onClick={() => { setButtonSelected(item.id); setIdentifyProduct(item) }} className={`flex items-center removeBlue py-2 px-2  gap-2 ${buttonSelected === item.id ? 'bg-CollorSecondaryDefault' : 'bg-white'} shadow-3xl rounded-2xl`}>
                                        <p>{item.icon}</p>
                                        <p>{item.name}</p>
                                    </button>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => { setLoading(true);setCartActive(true);setbody(true) }} className='fixed z-10 select-none md:right-10 right-3 bottom-10 bg-CollorSecondaryDefault border border-white shadow-xl rounded-full p-3'>
                <FaShoppingBag className='text-CollorDefault lg:text-4xl text-3xl' />
                <div id="qtd_order" className='bg-white w-6 shadow-3xl -top-2 right-0 h-6 absolute rounded-full'>{somaToHTML || 0}</div>
            </button>
            <div className="max-w-[1000px] m-auto pt-20">
                <div className="flex flex-wrap lg:justify-start justify-center gap-10 items-center">
                    {
                        foodToFilter?.map((item, i) => {
                            return <div alt={item.id} id={`itemFood-${item.id}`} onClick={() => { setAddCart(item) }} key={item.id} className={`${addCart?.id === item.id ? 'bg-CollorSecondaryDefault removeBlue duration-200 ease-in-out' : 'bg-white'} select-none rounded-2xl p-2 shadow-3xl w-[200px] h-[280px] cursor-pointer`}>
                                <div className="w-40 m-auto pb-5">
                                    <Image src={item.img} height={200} width={200} alt={item.name} className=" rounded-2xl select-none  " />
                                </div>
                                <h1 className="text-sm h-10">{item.name.substring(0, 25)}</h1>
                                <h1 className={`text-sm font-bold h-10  ${addCart?.id === item.id ? 'border-black' : 'text-CollorSecondaryDefault'}`}>{item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h1>
                                {
                                    addCart?.id === item.id && <div className="flex flex-col items-start gap-2">
                                        <div className="flex items-center">
                                            <button onClick={() => lessQuantityFood(item)} className={`rounded-l-2xl  flex justify-center bg-white items-center border-gray-300  w-10 h-6`}>
                                                -
                                            </button>
                                            <div id={`qtd_Food-${item.id}`} className={` bg-white border-l border-r border-gray-300 flex justify-center items-center w-10 h-6`}>
                                                {0}
                                            </div>
                                            <button onClick={() => moreQuantityFood(item)} className={`bg-white flex justify-center items-center rounded-r-2xl border-gray-300 w-10 h-6 `}>
                                                +
                                            </button>
                                        </div>
                                        <button id={`qtd_Orders-${item.id}`} onClick={() => { formatArrayToCart(item); toCart(item) }} className={` w-40 flex items-center gap-2 rounded-2xl px-2 `}>
                                            <FaShoppingBag id={`iconCart-${item.id}`} className={`${addCart?.id === item.id ? 'text-black' : 'text-CollorSecondaryDefault'}`} />
                                            <p>Adicionar</p>
                                        </button>
                                    </div>
                                }
                            </div>
                        })
                    }
                </div>
            </div >
        </div>
    )
}