import img from '@/assets/home/call-1.png';
import apple from '@/assets/home/apple.png';
import google from '@/assets/home/google.png';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
export const GetApp = () => {
    return (
        <div className='bg-black'>
            <div className='px-4 lg:px-20'>
            <Nav />
            </div>
            <div className='px-3 lg:px-20  lg:pb-0 lg:my-20 my-10'>

                <div className={`flex border rounded-2xl p-10 border-neutral-800 flex-col max-w-2xl mx-auto text-white  text-center darker-grotesque-400`}>

                    <p className={`darker-grotesque-600 text-[40px] lg:text-[60px] leading-[90%] font-bold mb-3`}>
                        Open the app on your phone or download it to continue
                    </p>
                    <p className='w-full  mt-3 leading-[2rem] text-[20px] darker-grotesque-500'>
                        Effortlessly connect business owners, agents, drivers, and truck owners in one powerful platform that streamlines the transportation of goods, from pickup to delivery.
                    </p>
                    <div className='flex gap-4 items-center mt-6 w-fit mx-auto'>
                        <button>
                            <img src={apple} alt='' />
                        </button>
                        <button>
                            <img src={google} alt='' />
                        </button>
                    </div>
                </div>

            </div>
            <Footer />
        </div>

    );
}