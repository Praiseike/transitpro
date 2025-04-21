import { GetStartedButton } from "./GetStartedBtn";
import { Heading } from "./Heading";
import img from '@/assets/home/delivery-journey.png';
export const Section1 = () => {
    return (
        <div className='px-3 lg:px-20 py-16 bg-white grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <div>
                <Heading header="Flow Connection">
                    Delivery Journey <br />
                    Overview
                </Heading>
                <p className='darker-grotesque-400 text-[30px] lg:pr-10 mb-10 leading-[100%] text-[#676565] mt-8'>
                    A clear visual timeline showing the complete delivery
                    process—from the business owner to the final
                    destination—featuring all involved parties, delivery details,
                    and successful completion status.
                </p>
                <GetStartedButton/>
            </div>
            <div>
                <img src={img} alt="Delivery Journey" className="w-full h-full lg:-top-10 relative bg-cover" />
            </div>
        </div>
    );
}