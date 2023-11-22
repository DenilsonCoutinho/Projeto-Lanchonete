"use client"
import Image from "next/image"
import { useCart } from "../context/cartContext"
import { useEffect, useState } from "react"

export default function Cart({ orders }) {

    const { setCartActive, cartActive, itensCart, setItensCart, loading, setLoading } = useCart()

    const [cartItensAnimate, setcartItensAnimate] = useState(false)
    const [loadingInternal, setLoadingInternal] = useState(false)
    async function animationCart() {
        if (cartActive) {
            await new Promise((resolve) => setTimeout(resolve, 200))
            setcartItensAnimate(true)
        }
    }
    animationCart()
    useEffect(() => {
        const itemsLocaStorage = JSON.parse(localStorage.getItem('foodService'))
        localStorage.setItem('foodService', JSON.stringify(itemsLocaStorage))
        setItensCart((itensCart) => [...itemsLocaStorage])
        console.log(itensCart)
    }, [loading])
    const itenStorage = JSON.parse(localStorage.getItem('foodService'))
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
            // localStorage.setItem('foodService', JSON.stringify(fortmatedItens));
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


    return (
        cartActive && <div className="h-full  fixed z-[9999] right-0 top-0 left-0">
            <div id="cartItens" className={`${cartItensAnimate ? "translate-x-0" : "translate-x-[999px]"} p-5 duration-150 bg-[#fff] h-full w-full relative z-[9999] `}>
                <div className="max-w-[1000px] m-auto">
                    <button onClick={() => { setCartActive(false); setcartItensAnimate(false); setLoading(false) }} className="bg-white shadow-3xl rounded-xl text-CollorDefault py-1 px-3">fechar</button>
                    <h1 className="text-black font-semibold pt-5">Seu carrinho:</h1>
                    <div className="overflow-hidden h-[490px] overflow-y-auto myScroll">
                        {
                            fortmatedItens?.map((items) => {
                                return (
                                    <div key={items?.id} className="pt-5 ">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-5">
                                                <Image src={items?.img} alt={items?.name} width={100} className="rounded-3xl" />
                                                -
                                                <div className="flex flex-col items-start">
                                                    <div className="flex items-center gap-2">

                                                        <h1 className="text-CollorDefault">{items?.name}</h1>
                                                    </div>
                                                    <p className="font-bold text-CollorSecondaryDefault">{items?.price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <button onClick={() => lessQuantityFood(items)} className={`rounded-l-2xl  flex justify-center items-center border 'border-CollorSecondaryDefault'  w-10 h-6`}>
                                                    -
                                                </button>
                                                <div id={`qtd_Food-Cart${items?.id}`} className={` border flex justify-center items-center border-CollorSecondaryDefault' w-10 h-6`}>
                                                    {items?.qtd}
                                                </div>
                                                <button id={`moreItem-${items?.id}`} onClick={() => moreQuantityFood(items)} className={` flex justify-center items-center rounded-r-2xl border w-10 h-6  'border-CollorSecondaryDefault'`}>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <hr className="mt-10" />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex flex-col items-end">
                        <p>Subtotal:R${22},00</p>
                        <p>Entrega + R${7},50</p>
                        <p>Total: R${400},34</p>
                        <button className="bg-CollorSecondaryDefault rounded-2xl text-white py-2 px-3">Continuar</button>
                    </div>
                </div>
            </div>
            {/* <div id="bgOpacityCart" onClick={() => { setCartActive(false); setCartItens(false) }} className="bg-black opacity-40 w-full h-full z-40 fixed right-0 left-0 top-0"></div> */}
        </div>
    )
}