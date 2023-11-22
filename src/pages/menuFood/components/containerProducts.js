"use client"

import Image from "next/image"
import listFood from "../../../listFood/listFood.js"
import { useEffect, useState } from "react"
import { FaShoppingBag } from "react-icons/fa"
import { useCart } from "../../../context/cartContext"
import Cart from "../../../components/cart"

export default function ContainerProduct({ items }) {
    const { setCartActive, itensCart, loading, setLoading } = useCart()
    const [addCart, setAddCart] = useState()
    const [attCart, setAttCart] = useState([])
    const [somaToHTML, setsomaToHTML] = useState()

    const foodToFilter = listFood.filter((food) => {
        return items?.toFilter ? food.type === items.toFilter : food.type === 'burguer'
    })

    function moreQuantityFood(item) {
        let qtdHtml = document.getElementById(`qtd_Food-${item.id}`)
        let qtdHtmlToNumber = parseInt(qtdHtml.innerHTML)
        qtdHtml.innerHTML = qtdHtmlToNumber + 1
    }

    function lessQuantityFood(item) {
        let qtdHtml = document.getElementById(`qtd_Food-${item.id}`)
        let qtdHtmlToNumber = parseInt(qtdHtml.innerHTML)
        if (qtdHtmlToNumber > 0) {
            qtdHtml.innerHTML = qtdHtmlToNumber - 1
        } else {
            qtdHtmlToNumber = 0
        }
    }
    useEffect(() => {
        let clickOn = document.getElementById(`itemFood-${1}`)
        clickOn?.click()
        // localStorage.setItem('foodService', JSON.stringify([]))
    }, [])

    async function prevFood() {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 100))
        setAttCart(itensCart)
        await new Promise(resolve => setTimeout(resolve, 100))
        setLoading(false)
    }
    useEffect(() => {
        prevFood()
        pickOrderTot()

    }, [loading])

    let toCartOrder = []

    function formatArrayToCart(item) {
        let qtdHtml = document.getElementById(`qtd_Food-${item?.id}`)
        let qtdHtmlToNumber = parseInt(qtdHtml?.innerHTML)
        let newArray = {
            id: item.id,
            name: item.name,
            img: item.img,
            price: parseInt(item.price) * parseInt(qtdHtmlToNumber),
            originalPrice: item.price,
            qtd: parseInt(qtdHtmlToNumber),
        }
        if (qtdHtmlToNumber > 0) {
            toCartOrder.push(newArray)
        }
    }
    function pickOrderTot() {

        let getQtd = JSON.parse(localStorage.getItem('foodService'))

        let qtdToCart = getQtd?.map((i) => {
            return i?.qtd
        })
        let soma = qtdToCart?.reduce((acumulador, valorAtual) => {
            return acumulador + valorAtual;
        }, 0);
        setsomaToHTML(soma)

    }
    async function toCart(item) {
        let qtdNow = document.getElementById(`qtd_Food-${item?.id}`)
        let qtdNowToInt = parseInt(qtdNow.innerHTML)
        let lastIndex = toCartOrder[toCartOrder.length - 1]
        let qtdFoodHtml = document.getElementById(`qtd_order`)
        if (qtdNowToInt > 0) {
            attCart.push(lastIndex);
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 100))
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
            qtdNow.innerHTML = 0
            return
        }

    }

    return (
        <div>
            <Cart />
            <button onClick={() => { setCartActive(true); setLoading(true) }} className='fixed z-10 select-none right-10 bottom-10 bg-CollorSecondaryDefault rounded-full p-3'>
                <FaShoppingBag className='text-CollorDefault text-4xl' />
                <div id="qtd_order" className='bg-white w-6 shadow-3xl -top-2 right-0 h-6 absolute rounded-full'>{somaToHTML || 0}</div>
            </button>
            <div className="max-w-[1000px] m-auto pt-20">
                <div className="flex flex-wrap lg:justify-start justify-center gap-10 items-center">
                    {
                        foodToFilter?.map((item, i) => {
                            return <div id={`itemFood-${item.id}`} onClick={() => { setAddCart(item) }} key={item.id} className={`${addCart?.id === item.id ? 'bg-CollorSecondaryDefault duration-200 ease-in-out' : 'bg-white'} select-none rounded-2xl p-2 shadow-3xl w-[200px] h-[280px] cursor-pointer`}>
                                <div className="w-40 m-auto pb-10">
                                    <Image src={item.img} height={200} width={200} alt={item.name} className=" rounded-2xl select-none  " />
                                </div>
                                <h1 className="text-sm h-10">{item.name.substring(0, 25)}</h1>
                                <h1 className={`text-sm font-bold h-10  ${addCart?.id === item.id ? 'border-black' : 'text-CollorSecondaryDefault'}`}>{item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h1>
                                {
                                    addCart?.id === item.id && <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            <button onClick={() => lessQuantityFood(item)} className={`rounded-l-2xl  flex justify-center items-center border ${addCart?.id === item.id ? 'border-black' : 'border-CollorSecondaryDefault'}  w-10 h-6`}>
                                                -
                                            </button>
                                            <div id={`qtd_Food-${item.id}`} className={` border flex justify-center items-center ${addCart?.id === item.id ? 'border-black' : 'border-CollorSecondaryDefault'} w-10 h-6`}>
                                                {0}
                                            </div>
                                            <button onClick={() => moreQuantityFood(item)} className={` flex justify-center items-center rounded-r-2xl border w-10 h-6  ${addCart?.id === item.id ? 'border-black' : 'border-CollorSecondaryDefault'}`}>
                                                +
                                            </button>
                                        </div>
                                        <button onClick={() => { formatArrayToCart(item); toCart(item) }} className={`${addCart?.id === item.id ? 'bg-white' : 'bg-CollorSecondaryDefault'} bg-CollorSecondaryDefault rounded-2xl p-1`}>
                                            <FaShoppingBag className={`${addCart?.id === item.id ? 'text-black' : 'text-CollorSecondaryDefault'}`} />
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