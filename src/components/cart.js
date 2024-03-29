"use client"
import Image from "next/image"
import { useCart } from "../context/cartContext"
import { useScreenSize } from "@/context/screenSizeContext";
import { useEffect, useState } from "react"
import { Box, useToast } from "@chakra-ui/react";

import { FaCreditCard, FaMagnifyingGlass, FaMapLocationDot, FaMotorcycle, FaPix, FaTrash } from "react-icons/fa6";
import { TbPaperBag } from "react-icons/tb";
import { FaCheckCircle, FaHamburger } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";
import { MdLocationOn, MdRemoveShoppingCart } from "react-icons/md";

import { validateFields } from "@/utils/form.validator";
import maskCep from "@/utils/regex/maskCep";
import OnlyNumber from "@/utils/regex/onlyNumber";
import OnlyLetter from "@/utils/regex/onlyLetter";

import Modal from "./modal";
import useModalContext from "@/context/modalProvider";

import Whatsapp from "../assets/WhatsApp.png";
export default function Cart() {

    const { setCartActive, cartActive, setItensCart, loading, setLoading, itensCart, cartItensAnimate, setbody, body } = useCart()
    const { setModal, detectModal, setDetectModal } = useModalContext()
    const { screenY, screenX } = useScreenSize()

    const [nextStep, setNextStep] = useState(1)
    const [cep, setCep] = useState('')
    const [adress, setAdress] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [number, setNumber] = useState('')
    const [deliverOrEstablishment, setDeliverOrEstablishment] = useState('')
    const [formartPay, setFormartPay] = useState('')
    const [city, setCity] = useState('')
    const [complement, setComplement] = useState('')

    const [itensToFormat, setItensToFormat] = useState()
    const [userData, setUserData] = useState()
    const [internalLoading, setInternalLoading] = useState(false)

    useEffect(() => {
        const locaStorageData = JSON.parse(localStorage.getItem('foodService'))
        const locaStorageUserData = JSON.parse(localStorage.getItem('userData'))
        setUserData(locaStorageUserData)
        localStorage.setItem('foodService', JSON.stringify(locaStorageData))
        setItensCart(locaStorageData)
        setItensToFormat(locaStorageData)
    }, [loading])

    if (typeof window !== undefined) {
        if (body === '1') {
            document.body.style.overflow = 'hidden';
        }
    } else {
        document.body.style.overflow = 'auto';
    }

    let storageData = []
    if (typeof window !== 'undefined') {
        let data = JSON.parse(localStorage.getItem('foodService'))
        storageData = data
    }

    let Prices = storageData?.map((i) => {
        return i?.price
    })
    let priceExtraMap = storageData?.map((i) => {
        return i?.extra
    })

    let priceExtra = priceExtraMap?.flat()?.map((i) => {
        return i?.price
    })

    let delivery = deliverOrEstablishment === '1' ? 0 : 5
    let sumTotExtra = priceExtra?.reduce((acumulador, valorAtual) => {
        return acumulador + valorAtual;
    }, 0);
    let sumTot = Prices?.reduce((acumulador, valorAtual) => {
        return acumulador + valorAtual;
    }, 0);

    let sumTotPrice = sumTot + sumTotExtra
    let totPrice = sumTotPrice + delivery

    async function incrementFoodQuantity(item) {
        let quantityHtmlElement = document.getElementById(`qtd_Food-Cart${item.id}`)
        let currentQuantity = parseInt(quantityHtmlElement.innerHTML)
        let newQuantity = quantityHtmlElement.innerHTML = currentQuantity + 1
        let objIndex = storageData.findIndex((obj => obj.id == item.id))
        if (objIndex !== -1) {
            storageData[objIndex].qtd = newQuantity;
            storageData[objIndex].price = item.originalPrice * newQuantity;
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 100))
            localStorage.setItem('foodService', JSON.stringify(storageData))
            setLoading(false)
            return

        }

    }

    async function decrementFoodQuantity(item) {
        let quantityHtmlElement = document.getElementById(`qtd_Food-Cart${item.id}`);
        let currentQuantity = parseInt(quantityHtmlElement.innerHTML);
        let newQuantity = quantityHtmlElement.innerHTML = currentQuantity - 1;
        let itemIndex = storageData.findIndex((obj) => obj.id == item.id);
        setLoading(true);
        if (itemIndex !== -1) {
            storageData[itemIndex].qtd = newQuantity;
            storageData[itemIndex].price = item.price - item.originalPrice;
            let filteredItems = storageData?.filter((itemStorage) => itemStorage.qtd > 0);
            await new Promise((resolve) => setTimeout(resolve, 100));
            localStorage.setItem('foodService', JSON.stringify(filteredItems));
            return;
        }
    }

    function filterItensCart() {
        let filteredItem = storageData?.filter((item) => {
            return item.qtd > 0
        })
        localStorage.setItem('foodService', JSON.stringify(filteredItem))

    }
    async function removeItemCart(item) {
        setLoading(true)
        let objIndex = storageData.findIndex((obj => obj.id == item.id))
        if (objIndex !== -1) {
            storageData[objIndex].qtd = 0
            await new Promise((resolve) => setTimeout(resolve, 100))
            localStorage.setItem('foodService', JSON.stringify(storageData))
            filterItensCart()
        }
        setLoading(false)
    }

    async function getCep() {
        var cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
        if (cep === '') {
            return
        }
        if (!cepRegex.test(cep)) {
            return alert('cep inválido')
        }
        try {
            let getCepApi = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json())
            setAdress(getCepApi.logradouro)
            setNeighborhood(getCepApi.bairro)
            setCity(getCepApi.localidade)
            setComplement('')
        } catch (error) {
            console.log(error)
        }
    }

    function nextStepCart() {
        const fieldstoValidate = [
            { "name": 'cep', "value": cep, "required": false, "type": 'string' },
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

    const toast = useToast({
        position: 'top-right',
        containerStyle: {
            width: '320px',
            maxWidth: '100%',
            zIndex: '999999'
        },
    })
    async function toWhatsapp() {
        let fortmatedUserData = userData.map((i) => {
            return `\n*${i.name}*\n${i.number}\n`
        })
        let text = `Olá! gostaria de fazer um pedido:\n`
        let orders = itensToFormat?.map((item) => {
            const extras = Array?.isArray(item.extra)
                ? item?.extra.map(i => i.qtd > 0 ? ' \n(' + 'x' + `${i.qtd + ')'} ` + i?.name + ` -  ${i.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}` : '').join('')
                : '';

            return `*x${item.qtd}* ${item.name}....*${item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}*${item.extra.length > 0 ? "\nAdicionais:" + extras : ''}  ${item?.comment && "\n*Observações:* " + item?.comment || ''}`;
        }).join('\n\n');
        text += `\n*Itens do pedido:*\n${orders}\n`

        if (deliverOrEstablishment === '2') {
            text += `\n*Endereço de entrega:*`
            text += `\n${adress},${number},\n${neighborhood},${city}`
            text += `\nCEP:${cep} / Complemento:${complement}\n`
            text += `\n*Subtotal: ${(sumTot + sumTotExtra).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}*`
            text += `\n*Entrega: ${(delivery).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}*`
            text += `\n*Total (com entrega): ${totPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}*`
        } else {
            text += `\n*Retirar seu pedido em:* \nR. Blumenau, 202 - Santo Antônio, Joinville - SC, 89204-248\n`
            text += `\n*Total: ${totPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}*`
        }
        text += `\n---------------------------------------\n`
        text += `\nTempo de entrega: de 30 minutos à 40 minutos`
        text += `\n${fortmatedUserData}\n`
        if (formartPay === "2") {
            text += `\n*Pagamento:* Pix`
            text += `\n*Nome da conta Pix:* Jhon doe`
            text += `\n*Chave Pix:* 47999977646`
            text += `\n\nCopie a chave e faça o pagamento através do Pix. O restaurante irá conferir o pagamento para liberação do seu pedido.
            `
        } else {
            text += `\n*Pagamento:* ${formartPay === "1" ? "Dinheiro" : formartPay === "3" ? "Crédito" : "Débito"}`
        }
        console.log(text)
        setModal(false)
        setInternalLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1))
        let setAnimation = window.document.querySelectorAll('.animationOn')
        for (const i of setAnimation) {
            await new Promise(resolve => setTimeout(resolve, 1500));
            i.innerHTML = ' Obrigado pela preferência!';
            await new Promise(resolve => setTimeout(resolve, 1500));
            i.innerHTML = 'Em breve, seu pedido estará a caminho!';
            await new Promise(resolve => setTimeout(resolve, 1500));
            i.style.display = 'none'
            window.location.href = `https://wa.me/+5548991109700?text=${encodeURI(text)}`
            i.style.display = 'flex'
        }
        setLoading(true)
        setbody('')
        localStorage.setItem('foodService', JSON.stringify([]))
        setItensCart([])
        setNextStep(1)
        await new Promise(resolve => setTimeout(resolve, 3000));
        setCartActive(false)
        setInternalLoading(false)
        setLoading(false)
        return

    }

    return (
        cartActive && <div className="h-full  fixed z-[99999] right-0 top-0 left-0 bg-white" >
            {detectModal === '2' && <Modal maxWidth={500} isback={false}>
                <div className=" p-3 flex w-full justify-center gap-5 flex-col items-center m-auto">
                    <div className="">
                        <h1 className="font-bold focus-in-expand text-gray-400">Ação necessária!</h1>
                    </div>
                    <Image alt="whatssap" src={Whatsapp} width={150} className="m-auto focus-in-expand" />
                    <button onClick={() => toWhatsapp()} className="focus-in-expand px-2 w-full rounded-xl py-3 bg-green-500 shadow-md text-white">Enviar pedido no Whatsapp </button>
                </div>
            </Modal>}
            {internalLoading ? <div className=" h-[100vh] flex flex-col justify-center items-center ">
                <span class="loader"><FaHamburger className="a" /></span>
                <div className="animationOn">Estamos recebendo seu pedido :)</div>
            </div>
                :
                <div id="cartItens" className={`${cartItensAnimate ? "translate-x-0" : "translate-x-full"} max-w-[1000px] m-auto p-5 duration-200 bg-[#fff] h-full w-full relative z-[9999] `}>
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <button onClick={() => setNextStep(1)} className="select-none h-8 w-8 rounded-full flex items-center justify-center shadow-3xl bg-CollorSecondaryDefault text-black">1</button>
                            <div className="border-b border-CollorSecondaryDefault w-5"></div>
                            <div onClick={() => setNextStep(itensCart.length > 0 ? 2 : 1)} className={`select-none h-8 w-8 rounded-full flex items-center cursor-pointer justify-center shadow-3xl ${nextStep === 2 || nextStep > 2 ? "bg-CollorSecondaryDefault" : "bg-white"} text-black`}>2</div>
                            <div className={`${nextStep === 3 ? "border-CollorSecondaryDefault border" : "border-b border-black "} w-5`}></div>
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center shadow-3xl select-none ${nextStep === 3 || nextStep > 3 ? "bg-CollorSecondaryDefault" : "bg-white"}  text-black`}>3</div>
                            <div className={`${nextStep === 4 ? "border-CollorSecondaryDefault border" : "border-b border-black "} w-5`}></div>
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center shadow-3xl select-none ${nextStep === 4 || nextStep > 3 ? "bg-CollorSecondaryDefault" : "bg-white"}  text-black`}>4</div>
                        </div>
                        <button onClick={() => { setLoading(false); setCartActive(false); setbody('') }} className="bg-white shadow-3xl font-medium rounded-xl text-CollorDefault py-1 px-3">Fechar</button>
                    </div>
                    {nextStep === 1 ? <div className="">
                        <h1 className="text-black font-semibold pt-5"> Seu carrinho:</h1>
                        <div style={{ height: screenY - 230 }} className={`overflow-hidden  overflow-y-auto myScroll shadow-innerShadow rounded-lg p-2`}>
                            {storageData.length > 0 ?
                                storageData?.map((items) => {
                                    return (
                                        <div key={items?.id} className="pt-5 focus-in-expand ">
                                            {<div className="flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center lg:gap-5 gap-2">
                                                        <div className="relative">
                                                        </div>
                                                        <div className="flex flex-col items-start">
                                                            <div className="flex items-center gap-2">

                                                                <h1 className="text-CollorDefault md:w-80  lg:text-base text-xs">{items?.name}</h1>
                                                            </div>
                                                            <p className=" text-CollorSecondaryDefault lg:text-base text-xs">{items?.price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                                            <ul className="list-disc pl-4 text-gray-400 font-extralight">
                                                                {items?.extra.map((i) => {
                                                                    return i.qtd > 0 && <li key={i.name} className="text-xs">
                                                                        <span className=" ">
                                                                            (x{i.qtd}) {i.name}
                                                                        </span>{' '}
                                                                        <span className=" ">
                                                                            {i?.price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                                                        </span>
                                                                    </li>
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {items?.comment !== "" && <h1 className="text-CollorDefault mt-5 text-xs"><strong>Observação:</strong> {items?.comment}</h1>}
                                                </div>
                                                <div className="flex items-center gap-5">
                                                    <div className="flex items-center rounded-2xl shadow-md">
                                                        <button onClick={() => decrementFoodQuantity(items)} className={`lg:rounded-l-2xl  rounded-l-xl  flex justify-center items-center border 'border-CollorSecondaryDefault'   lg:w-10 sm:w-7 w-6  lg:h-6 sm:h-7 h-5`}>
                                                            {items?.qtd > 1 ? '-' : <div><p className="lg:flex hidden ">-</p><FaTrash className="text-[10px] lg:hidden flex  text-red-500" /></div>}
                                                        </button>
                                                        <div id={`qtd_Food-Cart${items?.id}`} className={` border lg:text-base text-xs flex justify-center items-center border-CollorSecondaryDefault'  lg:w-10 sm:w-7 w-6 lg:h-6  sm:h-7 h-5`}>
                                                            {items?.qtd}
                                                        </div>
                                                        <button id={`moreItem-${items?.id}`} onClick={() => incrementFoodQuantity(items)} className={` flex justify-center items-center lg:rounded-r-2xl rounded-r-xl border lg:w-10 sm:w-7 w-6 lg:h-6  sm:h-7 h-5  'border-CollorSecondaryDefault'`}>
                                                            +
                                                        </button>
                                                    </div>
                                                    <button onClick={() => {
                                                        removeItemCart(items); toast({
                                                            position: 'top-right',
                                                            duration: 2000,
                                                            render: () => (
                                                                <Box className=" lg:translate-y-0 translate-y-28 rounded-md flex items-center gap-3" color='white' p={3} bg='red.400'>
                                                                    <FaCheckCircle className="text-white" /> Item removido
                                                                </Box>
                                                            ),
                                                        })
                                                    }} className="h-5 relative z-[999999999] font-bold px-3 bg-red-500  hidden lg:flex justify-center items-center text-white rounded-lg cursor-pointer">X</button>
                                                </div>
                                            </div>
                                            }
                                            <hr className="mt-5" />
                                        </div>
                                    )
                                })
                                :
                                <div style={{ height: screenY - 250 }} className={`2xl:text-3xl xl:text-xl md:text-lg text-center  min-h-[-800px] m-auto flex justify-center items-center text-gray-400`}> <MdRemoveShoppingCart />Seu carrinho está vazio</div>
                            }
                        </div>

                        <div className="flex flex-col lg:items-end items-start lg:gap-0  gap-2">
                            <div className="flex flex-col lg:items-end items-start">
                                <p className="text-gray-500 text-sm">Subtotal: {sumTot.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                <p className="text-gray-500 text-sm">Adicionais: {sumTotExtra.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                <p className=" text-gray-400 text-sm flex items-center gap-2"><FaMotorcycle className="text-gray-400 text-base" />Entrega: + {delivery.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                <p className="font-medium lg?text-xl text-base pt-">Total: <span className="font-extrabold text-CollorSecondaryDefault">{totPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setNextStep(itensCart.length > 0 ? 2 : 1)} className="bg-CollorSecondaryDefault rounded-2xl removeBlue text-white py-2 px-3">Continuar</button>
                            </div>
                        </div>
                    </div> :
                        nextStep === 2 ?
                            <div>
                                {<div className="flex flex-col items-start focus-in-expand">
                                    <div className="  w-full p-1 mt-10 rounded-lg">
                                        <div className="py-2 px-2 rounded-tl-3xl rounded-bl-3xl  shadow-md  bg-CollorSecondaryDefault w-full">
                                            <h1 className="text-white">Forma de entrega:</h1>
                                        </div>
                                        <div className="flex md:flex-row flex-col lg:items-center items-start lg:gap-4 mt-3 gap-2">
                                            <div onClick={() => setDeliverOrEstablishment('1')} className={`lg:mt-3 ${deliverOrEstablishment === '1' ? 'bg-CollorSecondaryDefault' : 'bg-white'} duration-150 select-none cursor-pointer px-3 border py-2  rounded-lg`}>
                                                <h1 className="text-black text-center flex items-center flex-row gap-1 "><TbPaperBag /> Retirar na loja</h1>
                                            </div>
                                            <div onClick={() => setDeliverOrEstablishment('2')} className={`lg:mt-3 ${deliverOrEstablishment === '2' ? 'bg-CollorSecondaryDefault' : 'bg-white'}  duration-150 select-none cursor-pointer px-3 border py-2  rounded-lg`}>
                                                <h1 className="text-black text-center flex items-center flex-row gap-1"><FaMotorcycle />Delivery</h1>
                                            </div>
                                        </div>
                                    </div>

                                    {deliverOrEstablishment === '1' ?
                                        <div style={{ height: screenX < 900 ? screenY - 395 : screenY - 345 }} className="focus-in-expand overflow-hidden w-full overflow-y-auto myScroll border rounded-xl shadow-xl p-2">
                                            <h1 className="flex items-start gap-3 text-sm"><MdLocationOn className="text-3xl w-10 text-CollorSecondaryDefault" />R. Blumenau, 202 - Santo Antônio, Joinville - SC, 89204-248</h1>
                                            <iframe className="w-full h-full  rounded-xl border-2 border-CollorSecondaryDefault " src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57242.14100170128!2d-48.92772745136715!3d-26.27354559999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94deaf812df04939%3A0x4f6cf9c0a434da5f!2sBurger%20King%20-%20Drive%20Thru%20II!5e0!3m2!1spt-BR!2sbr!4v1701355942256!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                        </div>
                                        : deliverOrEstablishment === '2' ?
                                            <div style={{ height: screenX < 900 ? screenY - 395 : screenY - 350 }} className={`focus-in-expand overflow-hidden lg:w-full  overflow-y-auto myScroll  rounded-lg p-2`}>
                                                <div className="flex items-start flex-col gap-2">
                                                    <p className="text-CollorDefault lg:text-base text-sm">CEP:</p>
                                                    <div className="flex relative">
                                                        <button className="absolute flex justify-center items-center right-2 top-1 rounded-xl bg-CollorSecondaryDefault px-3 py-[8px]">
                                                            <FaMagnifyingGlass onClick={getCep} className="text-white" />
                                                        </button>
                                                        <input maxLength={9} id="cep" onChange={(e) => setCep(maskCep(e.target.value))} onBlur={getCep} value={cep} type="text" className="  shadow-xl rounded-xl border pl-3 py-2 outline-none" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-5">
                                                    <div className="flex items-start flex-col  gap-2">
                                                        <p className="text-CollorDefault lg:text-base text-sm ">Endereço:</p>
                                                        <div className="flex ">
                                                            <input onChange={(e) => setAdress(OnlyLetter(e.target.value))} id="adress" value={adress} type="text" className=" shadow-xl xl:w-72   rounded-xl border pl-3 py-2 " />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start flex-col gap-2">
                                                        <p className="text-CollorDefault lg:text-base text-sm">Bairro:</p>
                                                        <div className="flex ">
                                                            <input onChange={(e) => setNeighborhood(OnlyLetter(e.target.value))} value={neighborhood} id="neighborhood" type="text" className=" shadow-xl xl:w-72 rounded-xl border pl-3 py-2 outline-none" />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start flex-col gap-2">
                                                        <p className="text-CollorDefault lg:text-base text-sm">Número:</p>
                                                        <div className="flex ">
                                                            <input onChange={(e) => setNumber(OnlyNumber(e.target.value))} id="number" value={number} type="text" className=" shadow-xl rounded-xl border pl-3 py-2 outline-none" />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start flex-col gap-2">
                                                        <p className="text-CollorDefault lg:text-base text-sm">Cidade:</p>
                                                        <div className="flex ">
                                                            <input onChange={(e) => setCity(OnlyLetter(e.target.value))} value={city || ''} id="city" type="text" className=" shadow-xl rounded-xl border pl-3 py-2 outline-none" />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start flex-col gap-2">
                                                        <p className="text-CollorDefault lg:text-base text-sm">Complemento:</p>
                                                        <div className="flex ">
                                                            <input onChange={(e) => setComplement(e.target.value)} id="complement" value={complement} type="text" className=" shadow-xl rounded-xl border pl-3 py-2 outline-none" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> :
                                            <> </>}
                                </div>
                                }
                                {deliverOrEstablishment && <div className="flex flex-col lg:items-end items-start lg:gap-0  gap-4">
                                    <div className="flex flex-col lg:items-end items-start">
                                        <p className="text-gray-500 text-sm">Subtotal: {sumTot.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                        <p className="text-gray-500 text-sm">Adicionais: {sumTotExtra.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                        <p className=" text-gray-400 text-sm flex items-center gap-2"><FaMotorcycle className="text-gray-400 text-base" />Entrega: + {delivery.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                        <p className="font-medium lg?text-xl text-base pt-2">Total: <span className="font-extrabold text-CollorSecondaryDefault">{totPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setNextStep(1)} className="bg-white shadow-3xl font-medium rounded-2xl text-CollorDefault py-2 px-3">Voltar</button>
                                        {
                                            deliverOrEstablishment === '1' ?
                                                <button onClick={() => setNextStep(3)} className="removeBlue bg-CollorSecondaryDefault rounded-2xl text-white py-2 px-3">Revisar pedido</button>
                                                :
                                                <button onClick={() => nextStepCart()} className="removeBlue bg-CollorSecondaryDefault rounded-2xl text-white py-2 px-3">Revisar pedido</button>
                                        }
                                    </div>
                                </div>}
                            </div> :
                            nextStep === 3 ?
                                <div className="focus-in-expand">
                                    {<div className="flex flex-col items-start ">
                                        <div className="  w-full p-1 mt-10 rounded-lg">
                                            <div className="py-2 px-2 rounded-tl-3xl rounded-bl-3xl  shadow-md  bg-CollorSecondaryDefault w-full">
                                                <h1 className="text-white">Forma de pagamento:</h1>
                                            </div>
                                            <div className="flex flex-col lg:items-center items-start lg:gap-4 mt-3 gap-2">
                                                <div onClick={() => setFormartPay('1')} className={`lg:mt-3 w-full ${formartPay === '1' ? 'bg-CollorSecondaryDefault' : 'bg-white'}  duration-150 select-none cursor-pointer px-3 border py-2  rounded-lg`}>
                                                    <h1 className="text-black text-center flex items-center flex-row gap-1"><HiCurrencyDollar />Dinheiro</h1>
                                                </div>
                                                <div onClick={() => setFormartPay('2')} className={`lg:mt-3 w-full ${formartPay === '2' ? 'bg-CollorSecondaryDefault' : 'bg-white'} duration-150 select-none cursor-pointer px-3 border py-2  rounded-lg`}>
                                                    <h1 className="text-black text-center flex items-center flex-row gap-1 "><FaPix /> pix</h1>
                                                </div>
                                                <div onClick={() => setFormartPay('3')} className={`lg:mt-3 w-full ${formartPay === '3' ? 'bg-CollorSecondaryDefault' : 'bg-white'}  duration-150 select-none cursor-pointer px-3 border py-2  rounded-lg`}>
                                                    <h1 className="text-black text-center flex items-center flex-row gap-1"><FaCreditCard />Crédito</h1>
                                                </div>
                                                <div onClick={() => setFormartPay('4')} className={`lg:mt-3 w-full ${formartPay === '4' ? 'bg-CollorSecondaryDefault' : 'bg-white'}  duration-150 select-none cursor-pointer px-3 border py-2  rounded-lg`}>
                                                    <h1 className="text-black text-center flex items-center flex-row gap-1"><FaCreditCard />Débito</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                    {<div className="flex flex-col lg:items-end items-start lg:gap-0  gap-4">
                                        <div className="flex flex-col lg:items-end items-start">
                                            <p className="text-gray-500 text-sm">Subtotal: {sumTot.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                            <p className="text-gray-500 text-sm">Adicionais: {sumTotExtra.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                            <p className=" text-gray-400 text-sm flex items-center gap-2"><FaMotorcycle className="text-gray-400 text-base" />Entrega: + {delivery.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                            <p className="font-medium lg?text-xl text-base pt-2">Total: <span className="font-extrabold text-CollorSecondaryDefault">{totPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setNextStep(2)} className="bg-white shadow-3xl font-medium rounded-2xl text-CollorDefault py-2 px-3">Voltar</button>
                                            <button onClick={() => setNextStep(4)} className="removeBlue bg-CollorSecondaryDefault rounded-2xl text-white py-2 px-3">Revisar pedido</button>
                                        </div>
                                    </div>}
                                </div> :
                                nextStep === 4 &&
                                <div className="">
                                    <h1 className="text-CollorDefault font-medium">Resumo do pedido:</h1>

                                    {<div style={{ height: screenY - 440 }} className={`overflow-hidden  overflow-y-auto myScroll shadow-innerShadow rounded-lg p-2`}>
                                        {storageData.map((items) => {
                                            return <div key={items.id}>
                                                <div className="flex items-center justify-between mt-2 focus-in-expand">
                                                    <div>
                                                        <div className="flex items-center lg:gap-5 gap-2">
                                                            <div className="flex flex-col items-start">
                                                                <div className="flex items-center gap-2">
                                                                    <h1 className="text-CollorDefault md:w-80  lg:text-base text-xs">{items?.name}</h1>
                                                                </div>
                                                                <p className=" text-CollorSecondaryDefault lg:text-base text-xs">{items?.price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                                                <ul className="list-disc pl-4 text-gray-400 font-extralight">
                                                                    {items?.extra.map((i) => {
                                                                        return i.qtd > 0 && <li key={i.name} className="text-xs">
                                                                            <span className=" ">
                                                                                (x{i.qtd}) {i.name}
                                                                            </span>{' '}
                                                                            <span className=" ">
                                                                                {i?.price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                                                            </span>
                                                                        </li>
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        {items?.comment !== "" && <h1 className="text-CollorDefault mt-4 text-xs"><strong>Observação:</strong> {items?.comment}</h1>}
                                                    </div>
                                                    <div className="flex items-center ">
                                                        <div className="flex gap-1 items-center rounded-2xl text-gray-600 ">
                                                            x  <span className="font-bold md:text-lg ">{items?.qtd}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="mt-4" />
                                            </div>
                                        })
                                        }
                                    </div>}
                                    <div className="">
                                        <div className="flex flex-col h-44  overflow-y-auto overflow-hidden ">
                                            {
                                                deliverOrEstablishment === '2' ?
                                                    <h1 h1 className="lg:text-xl font-semibold">Local de entrega:</h1>
                                                    :
                                                    <h1 h1 className="lg:text-xl font-semibold">Retirar em:</h1>
                                            }
                                            <div className="flex flex-row gap-3 items-start  pt-2">
                                                <div className="bg-CollorSecondaryDefault pt-1 rounded-xl p-1">
                                                    <FaMapLocationDot className="lg:text-4xl text-3xl" />
                                                </div>
                                                {deliverOrEstablishment === '2' ? <div className="flex flex-col">
                                                    <h1 className="font-semibold text-CollorDefault lg:text-base text-sm">{adress}, {number} ,{neighborhood}</h1>
                                                    <h1 className="font-medium text-gray-400 text-sm">{city} / {cep}</h1>
                                                </div>
                                                    :
                                                    <div className="flex flex-col items-start">
                                                        <h1 className="font-semibold text-CollorDefault lg:text-base text-sm"> R. Blumenau, 202 - Santo Antônio, Joinville - SC, 89204-248</h1>
                                                        <div className="w-52 h-20   border rounded-xl shadow-xl ove ">
                                                            <iframe className="w-52 h-20 focus-in-expand   rounded-xl border-2 border-CollorSecondaryDefault " src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57242.14100170128!2d-48.92772745136715!3d-26.27354559999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94deaf812df04939%3A0x4f6cf9c0a434da5f!2sBurger%20King%20-%20Drive%20Thru%20II!5e0!3m2!1spt-BR!2sbr!4v1701355942256!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div className="mt-4 flex flex-col justify-start">
                                                <h1 className="font-semibold text-CollorDefault">Forma de pagamento:</h1>
                                                {
                                                    <div>
                                                        <div className="flex flex-col lg:items-center items-start lg:gap-4 mt-3 gap-2">
                                                            {
                                                                formartPay === '1' ?
                                                                    <div className={`lg:mt-3 w-full ${formartPay === '1' ? 'bg-CollorSecondaryDefault' : 'bg-white'}  duration-150 select-none cursor-pointer px-3 border py-2  rounded-lg`}>
                                                                        <h1 className="text-black text-center flex items-center flex-row gap-1"><HiCurrencyDollar />Dinheiro</h1>
                                                                    </div>
                                                                    : formartPay === '2' ?
                                                                        <div className={`lg:mt-3 w-full ${formartPay === '2' ? 'bg-CollorSecondaryDefault' : 'bg-white'} duration-150 select-none cursor-pointer px-3 border py-2  rounded-lg`}>
                                                                            <h1 className="text-black text-center flex items-center flex-row gap-1 "><FaPix /> pix</h1>
                                                                        </div>
                                                                        : formartPay === '3' ?
                                                                            <div className={`lg:mt-3 w-full ${formartPay === '3' ? 'bg-CollorSecondaryDefault' : 'bg-white'}  duration-150 select-none cursor-pointer px-3 border py-2  rounded-lg`}>
                                                                                <h1 className="text-black text-center flex items-center flex-row gap-1"><FaCreditCard />Crédito</h1>
                                                                            </div>
                                                                            :
                                                                            <div className={`lg:mt-3 w-full ${formartPay === '4' ? 'bg-CollorSecondaryDefault' : 'bg-white'}  duration-150 select-none cursor-pointer px-3 border py-2  rounded-lg`}>
                                                                                <h1 className="text-black text-center flex items-center flex-row gap-1"><FaCreditCard />Débito</h1>
                                                                            </div>
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="border-b w-full py-4"></div>
                                        <div className="flex flex-col lg:items-end items-start lg:gap-0  gap-4">
                                            <div className="flex flex-col lg:items-end items-start">
                                                <p className="text-gray-500 text-sm">Subtotal: {sumTot.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                                <p className="text-gray-500 text-sm">Adicionais: {sumTotExtra.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                                <p className=" text-gray-400 text-sm flex items-center gap-2"><FaMotorcycle className="text-gray-400 text-base" />Entrega: + {delivery.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                                <p className="font-medium lg?text-xl text-base pt-2">Total: <span className="font-extrabold text-CollorSecondaryDefault">{totPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => setNextStep(3)} className="bg-white shadow-3xl font-medium rounded-2xl text-CollorDefault py-2 px-3">Voltar</button>
                                                <button onClick={() => { setModal(true); setDetectModal('2') }} className="bg-CollorSecondaryDefault rounded-2xl text-white py-2 px-3">Enviar pedido</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                    }
                </div>}
        </div >
    )
}