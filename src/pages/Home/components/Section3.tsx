import { Heading } from "./Heading";
import feature1 from '@/assets/home/feature-1.png';
import feature2 from '@/assets/home/feature-2.png';
import feature3 from '@/assets/home/feature-3.png';
import { GetStartedButton } from "./GetStartedBtn";

const FeatureCard = ({ image, title, features }: any) => {
    return (
        <div className="shadow-lg w-[370px] h-[530px] justify-center border overflow-hidden rounded-[35px]">
            <div className=" w-full h-[330px] overflow-hidden">
                <img src={image} alt={title} className="w-full scale-[1.3] mt-10 object-cover" />
            </div>
            <div className="px-6 py-4">

                <h3 className="px-4 text-[14px] w-fit py-2 rounded bg-[#FFCC004F]">{title}</h3>
                <ul className=" mt-4">
                    {features.map((feature: string, index: number) => (
                        <li key={index} className="text-sm flex items-center gap-3 mb-3">
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 17C13.94 17 17 13.94 17 8.5C17 3.06 13.94 0 8.5 0C3.06 0 0 3.06 0 8.5C0 13.94 3.06 17 8.5 17Z" fill="#28A745" />
                                <path d="M5.1001 9.34973L7.57258 11.8997C8.73674 8.55685 9.70506 7.09077 11.9001 5.09973" stroke="#F2F2F2" strokeWidth="1.50578" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            <span>
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


const features = [
    {
        image: feature1,
        title: "For Business Owners",
        features: [
            "Reliable goods delivery",
            "Real-time tracking",
            "Verified drivers",
        ]
    },
    {
        image: feature2,
        title: "For Agents",
        features: [
            "Earn by connecting",
            "Manage and track assignments",
        ]
    },
    {
        image: feature3,
        title: "For Drivers / Truck Owners",
        features: [
            "Get delivery request directly",
            "Flexible job opportunities",
            "Join verified transport networks",
        ]
    }

];

export const Section3 = () => {
    return (
        <div className='px-3 lg:px-20 mt-20'>
            <Heading placement='center' header="Features">
                Customized Features and<br className="hidden lg:block" />
                Workflows for Every Role
            </Heading>
            <div className='bg-white mt-16 flex gap-10 items-center flex-col lg:flex-row justify-center'>
                {
                    features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            {...feature}
                        />
                    ))
                }
            </div>
            <div className="mx-auto w-full lg:w-fit mt-16">
                <GetStartedButton/>
            </div>
        </div>
    );
}