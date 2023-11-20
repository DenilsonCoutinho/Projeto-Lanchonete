"use client"
import { FaHamburger } from "react-icons/fa"
import { BiSolidDrink } from "react-icons/bi";
import ContainerProduct from "./containerProducts";
import { useState } from "react";

export default function SelectMenu() {
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
    return (
        <div>
            <div className="pt-20 max-w-[1000px] flex justify-center m-auto">
                <div className="flex flex-row items-center gap-4">
                    {
                        menuOptions.map((item, i) => {
                            return <button key={item.id} onClick={() => { setButtonSelected(item.id); setIdentifyProduct(item) }} className={`flex items-center py-2 px-2 gap-2 ${buttonSelected === item.id ? 'bg-CollorSecondaryDefault' : 'bg-white'} shadow-3xl rounded-2xl`}>
                                <p>{item.icon}</p>
                                <p>{item.name}</p>
                            </button>
                        })
                    }
                </div>
            </div>
            <ContainerProduct items={identifyProduct}/>
        </div>
    )
}