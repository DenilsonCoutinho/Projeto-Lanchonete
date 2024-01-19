"use client"

import { useState, useEffect } from "react"
import listFood from "../listFood/listFood"

import { FaHamburger } from "react-icons/fa"
import { FaIceCream, } from "react-icons/fa6"
import { BiSolidDrink } from "react-icons/bi"

import { MdFastfood } from "react-icons/md"
export default function Menu({ setFood }) {

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
    useEffect(() => {
        let myButton = document.getElementById(`buttonSelected-${1}`)
        myButton?.click()
    }, [])

    function getFood(item) {
        const foodToFilter = listFood?.filter((food) => {
            return item?.toFilter ? food.type === item.toFilter : food.type === 'burguer'
        })
        setFood(foodToFilter)
    }

    return (
        <div id="menu" className="pt-28 max-w-[1200px] m-auto">
            <p className="text-CollorSecondaryDefault uppercase tracking-wide text-center font-semibold ">Cardápio</p>
            <h1 className="text-CollorDefault text-center font-bold text-3xl ">Nosso Cardápio</h1>
            <div>
                <div className="pt-20 max-w-[1000px] flex justify-center m-auto  py-1">
                    <div id="filter" className="flex flex-row  items-center gap-4 max-w-[1000px] overflow-x-auto bg-[#fdf7e7]  myScroll py-1 px-2">
                        {
                            menuOptions?.map((item, i) => {
                                return <button id={"buttonSelected-" + item.id} key={item.id} onClick={() => { setButtonSelected(item.id); getFood(item) }} className={`select-none flex ${i % 2 === 0 ? 'animatedElementLeft' : 'animatedElementRight'} items-center removeBlue w-28 text-center justify-center py-2 px-2  gap-2 ${buttonSelected === item.id ? 'bg-CollorSecondaryDefault' : 'bg-white'} shadow-xl rounded-2xl`}>
                                    <p className=" text-black">{item.icon}</p>
                                    <p className=" text-black">{item.name}</p>
                                </button>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}