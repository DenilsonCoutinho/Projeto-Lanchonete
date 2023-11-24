import { FaPhone } from "react-icons/fa";
import hamburguer_Presentation from '../../assets/presentation/hamburguerPresentation.png'
import Image from "next/image";
import { scrollToDiv } from "@/utils/scrollToDiv"

export default function Presentation() {
   
    return (
        <div className="max-w-[1000px] m-auto md:pt-28 pt-48 flex gap-10 items-center px-2">
            <div className="Informations_And_Title flex flex-col items-start max-w-[550px] gap-6">
                <h1 className="text-CollorDefault font-bold  lg:text-6xl md:text-4xl text-3xl ">
                    Escolha sua comida <span className="text-CollorSecondaryDefault">favorita</span>
                </h1>
                <p className="text-CollorDefault leading-8">Aproveite nosso Cardápio! Escolha o que desejar e receba em sua casa de forma rápida e segura.</p>
                <div className="flex items-center gap-3 ">
                    <button onClick={()=>scrollToDiv('filter')} className="animatedElementUpNow text-white rounded-xl removeBlue bg-CollorSecondaryDefault md:py-2 md:px-5 py-1 px-3">
                        Ver Cardápio
                    </button>
                    <button className="animatedElementUpNow flex items-center gap-3 text-CollorDefault removeBlue rounded-xl bg-white shadow-3xl md:py-2 md:px-5 py-1 px-3">
                        <div className="bg-CollorSecondaryDefault rounded-2xl p-1">
                            <FaPhone className="text-white md:text-base text-sm" />
                        </div>
                        <p className="md:text-base text-xs text-CollorDefault">(48) 9 4444-5555</p>
                    </button>
                </div>
            </div>
            <div className="sm:flex hidden">
                <Image src={hamburguer_Presentation} alt="hamburguer-Representation" />
            </div>
        </div>
    )
}