'use client'
import useModalContext from "@/context/modalProvider"
import { useEffect, useState } from "react"
import { FaArrowLeft, FaClosedCaptioning } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"

export default function Modal({ children, animationOn, isback,maxWidth }) {
    const { modal, setModal } = useModalContext()
    const [animation, setAnimation] = useState(false)

    useEffect(() => {
        setAnimation(false)
    }, [modal])

    async function animationModal() {
        if (modal) {
            await new Promise(resolve => setTimeout(resolve, 100))
            setAnimation(true)
        }
    }
    animationModal()

    return (
        modal && <div className="flex justify-center items-center fixed z-[9999999] w-full left-0 right-0 top-0 bottom-0 ">
            <div style={{maxWidth:`${`${maxWidth + "px"}`}`}} className={`bg-white   w-full  ${animation ? 'translate-y-0 opacity-1' : 'opacity-5 -translate-y-12'} duration-150 flex flex-col md:items-end items-start  relative z-[9999999] rounded-md`}>
                <button onClick={() => setModal(false)} className="rounded-full  md:flex hidden justify-start items-start text-black ">
                    <IoMdClose className="text-2xl" />
                </button>
                {isback && <div onClick={() => setModal(false)} className="md:hidden flex py-5  px-3">
                    <FaArrowLeft />
                </div>}
                {children}
            </div>
            <div onClick={() => setModal(false)} className="bg-gray-500 h-full left-0 right-0 top-0 bottom-0  w-full opacity-50 fixed">
            </div>
        </div>
    )
}