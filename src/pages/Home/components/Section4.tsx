import { GetStartedButton } from "./GetStartedBtn";
import { Heading } from "./Heading";
import img from '@/assets/home/promoter.png';
export const Section4 = () => {
    return (
        <div className='px-3 lg:px-20 py-16 mt-10 lg:mt-20 bg-white grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-0'>
            <div>
                <img src={img} alt="Delivery Journey" className="w-full mx-auto lg:w-[80%] h-full lg:-top-10 relative bg-cover" />
            </div>
            <div className="flex-col justify-center flex">
                <Heading header="Be a promoter">
                    Earn As You Grow the<br className="hidden lg:block" />
                    TransitPro Network
                </Heading>
                <p className='darker-grotesque-400 text-[30px] lg:pr-10 mb-10 leading-[100%] text-[#676565] mt-8'>
                    Invite users to join TransitPro, help them get started, and earn commissions on every successful transaction they make.
                </p>
                <GetStartedButton />
            </div>
        </div>
    );
}