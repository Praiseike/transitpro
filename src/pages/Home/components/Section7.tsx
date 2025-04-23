import img from '@/assets/home/call-1.png';
import apple from '@/assets/home/apple.png';
import google from '@/assets/home/google.png';
export const Section7 = () => {
    return (
        <div className='px-3 lg:px-20 pt-16 pb-16 lg:pb-0 mt-32 bg-white grid grid-cols-1 lg:grid-cols-2 gap-10 bg-gradient-to-r from-[#EDEFFC] to-[#FFE57B77]'>
            <div className='hidden lg:block'>
                <img src={img} alt='' />
            </div>
            <div className='flex flex-col justify-center'>
                <div className={`flex flex-col darker-grotesque-400`}>
                    <span className='py-2 w-fit rounded-full inline-block mb-3 text-[16px] font-lato'>
                        Introducing
                    </span>

                    <p className={`darker-grotesque-600 text-[40px] lg:text-[60px] leading-[90%] font-bold mb-3`}>
                        Meet TransitPro — Your Smart Logistics Companion
                    </p>
                    <p className='w-full lg:w-[80%] mt-3 leading-[2rem] text-[20px] darker-grotesque-500'>
                        Effortlessly connect business owners, agents, drivers, and truck owners in one powerful platform that streamlines the transportation of goods, from pickup to delivery.
                    </p>
                    <div className='flex gap-4 items-center mt-6'>
                        <button>
                            <img src={apple} alt=''/>
                        </button>
                        <button>
                            <img src={google} alt=''/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}