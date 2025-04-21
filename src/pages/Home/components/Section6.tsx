import { Heading } from "./Heading";
import test1 from '@/assets/home/test-1.png'

const TestimonialCard = ({ text, image, name, highlight = false }: any) => {
    return (
        <div className={`rounded p-6 py-9 text-center relative transition-all duration-300 ease-in-out
        ${highlight ? 'bg-[#FDCB42] text-black scale-105 z-10 -top-8' : 'bg-[#FAFAFA] text-gray-700'}
      `}>
            <div className="text-3xl text-gray-600 w-fit mx-auto mb-4">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_960_1153)">
                        <path d="M0.5 12V22.2857H10.7857V12H3.9286C3.9286 8.21905 7.00478 5.14286 10.7857 5.14286V1.71426C5.11384 1.71426 0.5 6.3281 0.5 12Z" fill="#3A4F39" />
                        <path d="M24.5001 5.14286V1.71426C18.8282 1.71426 14.2144 6.3281 14.2144 12V22.2857H24.5001V12H17.643C17.643 8.21905 20.7191 5.14286 24.5001 5.14286Z" fill="#3A4F39" />
                    </g>
                    <defs>
                        <clipPath id="clip0_960_1153">
                            <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                        </clipPath>
                    </defs>
                </svg>

            </div>
            <p className="mb-4">{text}</p>
            <div className="flex justify-center absolute left-0 w-full flex flex-col items-center justify-center mx-auto">
                <img
                    src={image}
                    alt={name}
                    className="w-14 h-14 object-cover rounded-full border-white shadow -mb-6 z-20"
                />
                <div className="mt-8 font-semibold">{name}</div>
            </div>
        </div>
    );
};

const Testimonials = () => {
    return (
        <div className="flex flex-col items-center justify-center px-4 gap-28 lg:gap-0 md:flex-row">
            <TestimonialCard
                text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
                image="https://i.pravatar.cc/150?img=47"
                name="Rachael"
            />
            <TestimonialCard
                text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
                image={test1}
                name="Lora Smith"
                highlight={true}
            />
            <TestimonialCard
                text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
                image="https://i.pravatar.cc/150?img=41"
                name="Mia Laurel"
            />
        </div>
    );
};

export const Section6 = () => {
    return (
        <div className='px-3 lg:px-20 mt-20'>
            <Heading header='Testimonials' placement='center'>
                Here is what uses are saying
            </Heading>
            <div className='bg-white mt-20 flex gap-10 items-center mb-10 flex-col lg:flex-row justify-center'>
                <Testimonials />
            </div>
        </div>
    );
}