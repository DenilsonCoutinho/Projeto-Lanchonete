"use client"
import Image from "next/image"
import { useCart } from "../context/cartContext"
import { useEffect, useState } from "react"
import { FaMagnifyingGlass, FaMapLocationDot, FaMotorcycle, FaTrash } from "react-icons/fa6";
import { useScreenSize } from "@/context/screenSizeContext";
import { MdRemoveShoppingCart } from "react-icons/md";
import { validateFields } from "@/utils/form.validator";
export default function Cart({ cartOn }) {

    const { setCartActive, cartActive, setItensCart, loading, setLoading, itensCart, cartItensAnimate, setbody, body } = useCart()
    const { screenY } = useScreenSize()
    const [nextStep, setNextStep] = useState(1)
    const [cep, setCep] = useState('')
    const [adress, setAdress] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [number, setNumber] = useState('')
    const [city, setCity] = useState('')
    const [complement, setComplement] = useState('')

    useEffect(() => {
        const itemsLocaStorage = JSON.parse(localStorage.getItem('foodService'))
        localStorage.setItem('foodService', JSON.stringify(itemsLocaStorage))
        setItensCart(itemsLocaStorage)
    }, [loading])
    function withouScroll() {
        if (body) {
            document.body.style.overflow = 'hidden';
        } else {
            if (typeof window !== 'undefined') {

                document.body.style.overflow = 'auto';
            }
        }
    }
    withouScroll()
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

    async function getCep() {
        try {
            let getCepApi = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json())
            console.log(getCepApi)
            setAdress(getCepApi.logradouro)
            setNeighborhood(getCepApi.bairro)
            setCity(getCepApi.localidade)
        } catch (error) {
            console.log(error)
        }
    }

    function getNextStep() {
        const fieldstoValidate = [
            { "name": 'cep', "value": cep, "required": true, "type": 'string' },
            { "name": 'neighborhood', "value": neighborhood, "required": true, "type": 'string' },
            { "name": 'number', "value": number, "required": true, "type": 'string' },
            { "name": 'city', "value": city, "required": true, "type": 'string' },
            { "name": 'adress', "value": adress, "required": true, "type": 'string' },
        ]
        if (validateFields(fieldstoValidate).length > 0) {
            return
        } else {
            setNextStep(3)
        }
    }

    return (
        cartActive && <div div className="h-full  fixed z-[9999] right-0 top-0 left-0 bg-white" >
            <div id="cartItens" className={`${cartItensAnimate ? "translate-x-0" : "translate-x-full"} max-w-[1000px] m-auto p-5 duration-150 bg-[#fff] h-full w-full relative z-[9999] `}>
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <button onClick={() => setNextStep(1)} className="h-8 w-8 rounded-full flex items-center justify-center shadow-3xl bg-CollorSecondaryDefault text-black">1</button>
                        <div className="border-b border-CollorSecondaryDefault w-5"></div>
                        <div onClick={() => setNextStep(2)} className={`h-8 w-8 rounded-full flex items-center justify-center shadow-3xl ${nextStep === 2 || nextStep > 2 ? "bg-CollorSecondaryDefault" : "bg-white"} text-black`}>2</div>
                        <div className={`${nextStep === 3 ? "border-CollorSecondaryDefault border" : "border-b border-black "} w-5`}></div>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center shadow-3xl ${nextStep === 3 ? "bg-CollorSecondaryDefault" : "bg-white"}  text-black`}>3</div>
                    </div>
                    <button onClick={() => { setLoading(false); setCartActive(false); setbody(false) }} className="bg-white shadow-3xl font-medium rounded-xl text-CollorDefault py-1 px-3">Fechar</button>
                </div>
                {nextStep === 1 ? <div className="">
                    <h1 className="text-black font-semibold pt-5"> Seu carrinho:</h1>
                    <div style={{ height: screenY - 230 }} className={`overflow-hidden  overflow-y-auto myScroll shadow-innerShadow rounded-lg p-2`}>
                        {fortmatedItens.length > 0 ?
                            fortmatedItens?.map((items) => {
                                return (
                                    <div key={items?.id} className="pt-5 ">
                                        {<div className="flex items-center justify-between">
                                            <div className="flex items-center lg:gap-5 gap-2">
                                                <Image src={items?.img} alt={items?.name} width={100} className="lg:rounded-3xl rounded-xl lg:w-28 md:w-24 w-20" />
                                                -
                                                <div className="flex flex-col items-start">
                                                    <div className="flex items-center gap-2">

                                                        <h1 className="text-CollorDefault md:w-80 w-20 lg:text-base text-xs">{items?.name}</h1>
                                                    </div>
                                                    <p className=" text-CollorSecondaryDefault lg:text-base text-xs">{items?.price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-5">
                                                <div className="flex items-center rounded-2xl shadow-md">
                                                    <button onClick={() => lessQuantityFood(items)} className={`lg:rounded-l-2xl  rounded-l-xl  flex justify-center items-center border 'border-CollorSecondaryDefault'   lg:w-10 sm:w-7 w-6  lg:h-6 sm:h-7 h-5`}>
                                                        {items.qtd > 1 ? '-' : <div><p className="lg:flex hidden ">-</p><FaTrash className="text-[10px] lg:hidden flex  text-red-500" /></div>}
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

                                        }
                                        <hr className="mt-10" />
                                    </div>
                                )
                            })
                            :
                            <div style={{ height: screenY - 250 }} className={`2xl:text-3xl xl:text-xl md:text-lg text-center  min-h-[-800px] m-auto flex justify-center items-center text-gray-400`}> <MdRemoveShoppingCart />Seu carrinho está vazio</div>
                        }
                    </div>

                    <div className="flex flex-col lg:items-end items-start lg:gap-0  gap-4">
                        <div className="flex flex-col lg:items-end items-start">
                            <p className="text-gray-500 text-sm">Subtotal: {sumTotPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                            <p className=" text-gray-400 text-sm flex items-center gap-2"><FaMotorcycle className="text-gray-400 text-base" />Entrega: + {delivery.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                            <p className="font-medium lg?text-xl text-base pt-2">Total: <span className="font-extrabold text-CollorSecondaryDefault">{totPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setNextStep(2)} className="bg-CollorSecondaryDefault rounded-2xl text-white py-2 px-3">Continuar</button>
                        </div>
                    </div>
                </div> :
                    nextStep === 2 ?
                        <div>
                            <div style={{ height: screenY - 230 }} className={`overflow-hidden mt-10 overflow-y-auto myScroll  rounded-lg p-2`}>
                                <div className="flex items-start flex-col gap-2">
                                    <p className="text-CollorDefault lg:text-base text-sm">CEP:</p>
                                    <div className="flex relative">
                                        <button className="absolute flex justify-center items-center right-2 top-1 rounded-xl bg-CollorSecondaryDefault px-3 py-[8px]">
                                            <FaMagnifyingGlass onClick={getCep} className="text-white" />
                                        </button>
                                        <input maxlength="9" id="cep" onChange={(e) => setCep(e.target.value)} onBlur={getCep} value={cep} type="text" className="  shadow-xl rounded-xl focus:border-1 pl-3 py-2 outline-none" />
                                    </div>
                                </div>

                                <div className="grid 2xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
                                    <div className="flex items-start flex-col  gap-2">
                                        <p className="text-CollorDefault lg:text-base text-sm ">Endereço:</p>
                                        <div className="flex ">
                                            <input onChange={(e) => setAdress(e.target.value)} id="adress" value={adress} type="text" className=" shadow-xl max-w-96 w-full  rounded-xl focus:border-1 pl-3 py-2 " />
                                        </div>
                                    </div>
                                    <div className="flex items-start flex-col gap-2">
                                        <p className="text-CollorDefault lg:text-base text-sm">Bairro:</p>
                                        <div className="flex ">
                                            <input onChange={(e) => setNeighborhood(e.target.value)} value={neighborhood} id="neighborhood" type="text" className=" shadow-xl rounded-xl focus:border-1 pl-3 py-2 outline-none" />
                                        </div>
                                    </div>
                                    <div className="flex items-start flex-col gap-2">
                                        <p className="text-CollorDefault lg:text-base text-sm">Número:</p>
                                        <div className="flex ">
                                            <input onChange={(e) => setNumber(e.target.value)} id="number" value={number} type="text" className=" shadow-xl rounded-xl focus:border-1 pl-3 py-2 outline-none" />
                                        </div>
                                    </div>
                                    <div className="flex items-start flex-col gap-2">
                                        <p className="text-CollorDefault lg:text-base text-sm">Cidade:</p>
                                        <div className="flex ">
                                            <input onChange={(e) => setCity(e.target.value)} value={city} id="city" type="text" className=" shadow-xl rounded-xl focus:border-1 pl-3 py-2 outline-none" />
                                        </div>
                                    </div>

                                    <div className="flex items-start flex-col gap-2">
                                        <p className="text-CollorDefault lg:text-base text-sm">Complemento:</p>
                                        <div className="flex ">
                                            <input onChange={(e) => setComplement(e.target.value)} id="complement" value={complement} type="text" className=" shadow-xl rounded-xl focus:border-1 pl-3 py-2 outline-none" />
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="flex flex-col lg:items-end items-start lg:gap-0  gap-4">
                                <div className="flex flex-col lg:items-end items-start">
                                    <p className="text-gray-500 text-sm">Subtotal: {sumTotPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                    <p className=" text-gray-400 text-sm flex items-center gap-2"><FaMotorcycle className="text-gray-400 text-base" />Entrega: + {delivery.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                    <p className="font-medium lg?text-xl text-base pt-2">Total: <span className="font-extrabold text-CollorSecondaryDefault">{totPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setNextStep(1)} className="bg-white shadow-3xl font-medium rounded-2xl text-CollorDefault py-2 px-3">Voltar</button>
                                    <button onClick={() => getNextStep()} className="removeBlue bg-CollorSecondaryDefault rounded-2xl text-white py-2 px-3">Revisar pedido</button>

                                </div>
                            </div>
                        </div> :
                        nextStep === 3 &&
                        <>
                            {
                                <div className="">
                                    <h1 className="text-CollorDefault font-medium">Resumo do pedido:</h1>

                                    {<div style={{ height: screenY - 350 }} className={`overflow-hidden  overflow-y-auto myScroll shadow-innerShadow rounded-lg p-10`}>
                                        {itensCart.map((items) => {

                                            return <>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center lg:gap-5 gap-2">
                                                        <Image key={items?.id} src={items?.img} alt={items?.name} width={100} className="lg:rounded-3xl rounded-xl lg:w-28 md:w-24 w-14" />
                                                        -
                                                        <div className="flex flex-col items-start">
                                                            <div className="flex items-center gap-2">
                                                                <h1 className="text-CollorDefault md:w-80 w-20 lg:text-base text-xs">{items?.name}</h1>
                                                            </div>
                                                            <p className=" text-CollorSecondaryDefault lg:text-base text-xs">{items?.price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center ">
                                                        <div className="flex gap-2 items-center rounded-2xl ">
                                                            x  <span className="font-bold text-xl">{items?.qtd}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="mt-4" />
                                            </>
                                        })
                                        }
                                    </div>}
                                    <div className="">
                                        <div className="flex flex-col">
                                            <h1 className="lg:text-xl font-semibold">Local de entrega:</h1>

                                            <div className="flex flex-row gap-3 items-start  pt-2">
                                                <div className="bg-CollorSecondaryDefault pt-1 rounded-xl p-1">
                                                    <FaMapLocationDot className="lg:text-4xl text-3xl" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <h1 className="font-semibold text-CollorDefault lg:text-base text-sm">{adress}, {number} ,{neighborhood}</h1>
                                                    <h1 className="font-medium text-gray-400 text-sm">{city} / {cep}</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-b w-full py-4"></div>
                                        <div className="flex flex-col lg:items-end items-start lg:gap-0  gap-4">
                                            <div className="flex flex-col lg:items-end items-start">
                                                <p className="text-gray-500 text-sm">Subtotal: {sumTotPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                                <p className=" text-gray-400 text-sm flex items-center gap-2"><FaMotorcycle className="text-gray-400 text-base" />Entrega: + {delivery.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                                <p className="font-medium lg?text-xl text-base pt-2">Total: <span className="font-extrabold text-CollorSecondaryDefault">{totPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => setNextStep(2)} className="bg-white shadow-3xl font-medium rounded-2xl text-CollorDefault py-2 px-3">Voltar</button>
                                                <button onClick={() => setNextStep(3)} className="bg-CollorSecondaryDefault rounded-2xl text-white py-2 px-3">Enviar pedido</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            }
                        </>
                }
            </div>
        </div >
    )
}