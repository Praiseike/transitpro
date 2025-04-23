import { Nav } from "./Nav"
import lineImg from '@/assets/home/lines.png'
import { GetStartedButton } from "./GetStartedBtn"
export const Header = () => {
    return (
        <div className="relative w-full h-screen lg:h-auto bg-black">
            <img src='header.png' alt="Header" className="w-full h-screen lg:h-full object-cover" />
            <div className="absolute top-0 h-full  w-full left-0 right-0 bottom-0 bg-gradient-to-r from-[#000000] px-4 lg:px-20 to-transparent p-4">
                <Nav />
                <div className="mt-20">
                    <h1 className="text-5xl lg:text-[60px] leading-[90%] darker-grotesque-700 text-white text-center lg:text-start">
                        Move Your Goods <span className="text-primary darker-grotesque-700">Seamlessly </span><br className='hidden lg:block'/>
                        with Trusted Hands
                    </h1>
                    <img src={lineImg} alt="Lines" className="my-6 w-[70%] mx-auto lg:mx-0 lg:w-auto" />
                    <p className='darker-grotesque-300 text-[27px] text-center lg:text-start lg:text-[30px] leading-[100%] text-white'>
                        TransitPro connects businesses to a vast network of trusted drivers, agents,<br className='hidden lg:block'/>
                        and truck owners to deliver goods safely and efficiently.
                    </p>
                    <div className="mt-10">
                        <GetStartedButton />
                    </div>
                </div>
            </div>
        </div>
    )
}