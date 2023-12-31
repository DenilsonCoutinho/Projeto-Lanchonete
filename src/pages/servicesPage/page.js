import service_1 from '../../assets/svgServices/making_order.svg'
import service_2 from '../../assets/svgServices/delivery.svg'
import service_3 from '../../assets/svgServices/foodRepresentation.svg'
import Image from 'next/image'
export default function ServicePage() {

    return (
        <div id='service' className="Container lg:max-w-[1000px] m-auto flex flex-col pt-28">
            <p className="font-semibold text-CollorSecondaryDefault tracking-wider text-center">Nossos Serviços</p>
            <h1 className="text-CollorDefault font-bold lg:text-3xl text-2xl text-center">O que oferecemos a você?</h1>
            <div className='flex lg:flex-row flex-col items-center justify-between lg:gap-10 gap-5 pt-20'>
                <div className='flex flex-col items-center bg-CollorSecondaryDefault rounded-2xl lg:w-72 p-2 animationToTop'>
                    <Image alt='serviço 1' src={service_1} width={140} className='h-20'/>
                    <h1 className='text-xl h-10 font-bold text-white'>Fácil de pedir</h1>
                    <p className='text-white font-light lg:w-72 w-72 px-2 text-center'>Você só precisa de alguns passos para pedir seu Lanche</p>
                </div>

                <div className='flex flex-col items-center bg-CollorSecondaryDefault rounded-2xl lg:w-72 p-2 animatedElmentBottom'>
                    <Image alt='serviço 2' src={service_2} width={140} className='h-20'/>
                    <h1 className='text-xl h-10 font-bold text-white'>Entrega rápida e segura</h1>
                    <p className='text-white font-light lg:w-72 w-72 px-2 text-center'>Nossa entrega é sempre pontual, rápida e segura.</p>
                </div>

                <div className='flex flex-col items-center bg-CollorSecondaryDefault rounded-2xl lg:w-72 p-2 animatedElmentBottom'>
                    <Image alt='serviço 3' src={service_3} width={140} className='h-20'/>
                    <h1 className='text-xl h-10 font-bold text-white'>Lanche de qualidade</h1>
                    <p className='text-white font-light lg:w-72 w-72 px-2 text-center'>Não só a rapidez na entrega, a qualidade também é o nosso forte.</p>
                </div>
            </div>
        </div>
    )
}