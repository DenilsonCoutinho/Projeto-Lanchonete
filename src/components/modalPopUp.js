'use client'
import useModalContext from "@/context/modalProvider"
import { useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"

export default function ModalPopUp({ children, animationOn }) {
    const { modalPopUp, setModalPopUp } = useModalContext()
    const [animation, setAnimation] = useState(false)
    const [executed, setExecuted] = useState(false)

    // useEffect(() => {
    //     setAnimation(false)
    // }, [modalPopUp])

    // useEffect(() => {
    //     const handleScroll = () => {
    //       const mouseY = window.scrollY;
    //       if (mouseY > 700 && !executed) {
    //         setModalPopUp(true);
    //         setExecuted(true);  // Marca que o código já foi executado
    //       }
    //     };
    
    //     window.addEventListener('scroll', handleScroll);
    
    //     // Remover o ouvinte de evento quando o componente é desmontado
    //     return () => {
    //       window.removeEventListener('scroll', handleScroll);
    //     };
    //   }, [executed]); 

    // async function animationModal() {
    //     if (modalPopUp) {
    //         await new Promise(resolve => setTimeout(resolve, 100))
    //         setAnimation(true)
    //     }
    // }
    // animationModal()

    return (
        modalPopUp && <div className="flex justify-center items-center fixed z-[9999999]  left-0 right-0 top-0 bottom-0 ">
            <div className={`bg-white ${animation ? 'translate-y-0 opacity-1' : 'opacity-5 -translate-y-12'} duration-150 flex flex-col md:items-end items-start  relative z-[9999999] rounded-md`}>
                <button onClick={() => setModalPopUp(false)} className="rounded-full  md:flex hidden justify-start items-start text-black ">
                    <IoMdClose className="text-2xl" />
                </button>
                <div onClick={() => setModalPopUp(false)} className="md:hidden flex py-5  px-3">
                    <FaArrowLeft />
                </div>
                {children}
            </div>
            <div  className="bg-gray-500 h-full left-0 right-0 top-0 bottom-0  w-full opacity-50 fixed">
            </div>
        </div>
    )
}