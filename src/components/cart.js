"use client"
import Image from "next/image"
import { useCart } from "../context/cartContext"
import { useEffect, useState } from "react"
import { FaMotorcycle, FaTrash } from "react-icons/fa6";

export default function Cart() {

    const { setCartActive, cartActive, setItensCart, loading, setLoading } = useCart()
    const [cartItensAnimate, setcartItensAnimate] = useState(false)
    async function animationCart() {
        if (cartActive) {
            await new Promise((resolve) => setTimeout(resolve, 200))
            setcartItensAnimate(true)
            document.body.style.overflow = 'hidden';
        } else {
            if (typeof window !== 'undefined') {

                document.body.style.overflow = 'auto';
            }
        }
    }

    animationCart()

    useEffect(() => {
        const itemsLocaStorage = JSON.parse(localStorage.getItem('foodService'))
        localStorage.setItem('foodService', JSON.stringify(itemsLocaStorage))
        setItensCart([...itemsLocaStorage])
    }, [loading])

    let itenStorage = []
    if (typeof window !== 'undefined') {
        let itensStorage = JSON.parse(localStorage.getItem('foodService'))
        itenStorage = itensStorage
    }
    let cartNoDuplicates = {};

    itenStorage?.forEach(item => {
        // Gera uma chave única para cada tipo de produto (pode ser melhorada dependendo do seu caso)
        let key = item?.id;
        // Se o item já existe no carrinhoSemDuplicatas, adiciona a quantidade e preço
        if (cartNoDuplicates[key]) {
            cartNoDuplicates[key].qtd += item.qtd;
            cartNoDuplicates[key].price += item.price;
        } else {
            // Se o item não existe no carrinhoSemDuplicatas, adiciona o item
            cartNoDuplicates[key] = {
                id: item?.id,
                img: item?.img,
                name: item?.name,
                qtd: item?.qtd,
                price: item?.price,
                originalPrice: item?.originalPrice
            };
        }
    });
    let fortmatedItens = Object.values(cartNoDuplicates)
    let Prices = fortmatedItens.map((i) => {
        return i.price
    })
    let delivery = 5

    let sumTotPrice = Prices.reduce((acumulador, valorAtual) => {
        return acumulador + valorAtual;
    }, 0);
    let totPrice = sumTotPrice + delivery


    function attCart() {
        let filteredItem = fortmatedItens?.filter((item) => {
            return item.qtd > 0
        })
        localStorage.setItem('foodService', JSON.stringify(filteredItem))

    }
    async function moreQuantityFood(item) {

        let qtdHtml = document.getElementById(`qtd_Food-Cart${item.id}`)
        let qtdHtmlToNumber = parseInt(qtdHtml.innerHTML)
        let q = qtdHtml.innerHTML = qtdHtmlToNumber + 1
        let objIndex = fortmatedItens.findIndex((obj => obj.id == item.id))
        if (objIndex !== -1) {
            // Se o item já existe, atualize o objeto existente
            fortmatedItens[objIndex].qtd = q;
            fortmatedItens[objIndex].price = item.originalPrice * q;
            setLoading(true)
            //coloquei esse await para ele não passar direto sem setar no local storage o pedido
            await new Promise((resolve) => setTimeout(resolve, 100))
            localStorage.setItem('foodService', JSON.stringify(fortmatedItens))
            setLoading(false)
            return

        }

    }

    async function lessQuantityFood(item) {
        let qtdHtml = document.getElementById(`qtd_Food-Cart${item.id}`)
        let qtdHtmlToInt = parseInt(qtdHtml.innerHTML)
        let qtdScreen = qtdHtml.innerHTML = qtdHtmlToInt - 1
        let objIndex = fortmatedItens.findIndex((obj => obj.id == item.id))

        if (objIndex !== -1) {
            fortmatedItens[objIndex].qtd = qtdScreen;
            fortmatedItens[objIndex].price = item.price - item.originalPrice;
            let filteredItem = fortmatedItens?.filter((item) => {
                return item.qtd > 0
            })
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 100))
            localStorage.setItem('foodService', JSON.stringify(filteredItem))
            setLoading(false)
            return
        }
    }

    async function removeItemCart(item) {
        let objIndex = fortmatedItens.findIndex((obj => obj.id == item.id))
        if (objIndex !== -1) {
            fortmatedItens[objIndex].qtd = 0
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 100))
            localStorage.setItem('foodService', JSON.stringify(fortmatedItens))
            attCart()
            setLoading(false)
        }
    }


    return (
        cartActive && <div className="h-full  fixed z-[9999] right-0 top-0 left-0">
            <div id="cartItens" className={`${cartItensAnimate ? "translate-x-0" : "translate-x-[999px]"} p-5 duration-150 bg-[#fff] h-full w-full relative z-[9999] `}>
                <div className="max-w-[1000px] m-auto">
                    <button onClick={() => { setCartActive(false); setcartItensAnimate(false); setLoading(false) }} className="bg-white shadow-3xl rounded-xl text-CollorDefault py-1 px-3">fechar</button>
                    <h1 className="text-black font-semibold pt-5"> Seu carrinho:</h1>
                    <div className="overflow-hidden 2xl:h-[430px] xl:h-[340px] md:h-[320px] overflow-y-auto myScroll shadow-innerShadow rounded-lg p-2">
                        {
                            fortmatedItens?.map((items) => {
                                return (
                                    <div key={items?.id} className="pt-5 ">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center lg:gap-5 gap-2">
                                                <Image src={items?.img} alt={items?.name} width={100} className="lg:rounded-3xl rounded-xl xl:w-24 w-14" />
                                                -
                                                <div className="flex flex-col items-start">
                                                    <div className="flex items-center gap-2">

                                                        <h1 className="text-CollorDefault md:w-80 w-24 lg:text-base text-xs">{items?.name}</h1>
                                                    </div>
                                                    <p className=" text-CollorSecondaryDefault lg:text-base text-xs">{items?.price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-5">
                                                <div className="flex items-center">
                                                    <button onClick={() => lessQuantityFood(items)} className={`lg:rounded-l-2xl rounded-l-xl  flex justify-center items-center border 'border-CollorSecondaryDefault'   lg:w-10 sm:w-7 w-6  lg:h-6 sm:h-7 h-5`}>
                                                        {items.qtd > 1 ? '-' : <div><p className="lg:flex hidden ">-</p><FaTrash  className="text-[10px] lg:hidden flex  text-red-500"/></div>}
                                                    </button>
                                                    <div id={`qtd_Food-Cart${items?.id}`} className={` border lg:text-base text-xs flex justify-center items-center border-CollorSecondaryDefault'  lg:w-10 sm:w-7 w-6 lg:h-6  sm:h-7 h-5`}>
                                                        {items?.qtd}
                                                    </div>
                                                    <button id={`moreItem-${items?.id}`} onClick={() => moreQuantityFood(items)} className={` flex justify-center items-center lg:rounded-r-2xl rounded-r-xl border lg:w-10 sm:w-7 w-6 lg:h-6  sm:h-7 h-5  'border-CollorSecondaryDefault'`}>
                                                        +
                                                    </button>
                                                </div>
                                                {
                                                    <button onClick={() => removeItemCart(items)} className="h-5 bg-red-500 w-5 hidden lg:flex justify-center items-center text-white rounded-lg cursor-pointer">X</button>
                                                }
                                            </div>
                                        </div>
                                        <hr className="mt-10" />
                                    </div>
                                )
                            })
                        }
                    </div>
                    {

                        <div className="flex lg:flex-col flex-row items-end lg:gap-0  gap-4">
                            <div className="flex flex-col items-">
                                <p className="text-gray-500 text-sm">Subtotal: {sumTotPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                <p className=" text-gray-400 text-sm flex items-center gap-2"><FaMotorcycle className="text-gray-400 text-base" />Entrega: + {delivery.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                <p className="font-medium lg?text-xl text-base py-2">Total: <span className="font-extrabold text-CollorSecondaryDefault">{totPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></p>
                            </div>
                            <button className="bg-CollorSecondaryDefault rounded-2xl text-white py-2 px-3">Continuar</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}