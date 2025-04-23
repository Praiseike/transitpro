import how1 from '@/assets/home/how-1.png';
import how2 from '@/assets/home/how-2.png';
import how3 from '@/assets/home/how-3.png';
import how4 from '@/assets/home/how-4.png';
import { Heading } from "./Heading";

export const Section2 = () => {
    return (
        <div className='px-3 lg:px-20 '>
            <Heading placement='center' header="How it Works">
                How our platform makes <br className="hidden lg:block" />
                delivery <span className="darker-grotesque-600 text-primary">easier</span>
            </Heading>
            <div className='bg-white mt-16 grid lg:w-[80%] w-full mx-auto grid-cols-1 lg:grid-cols-2 gap-16'>
                <img src={how1} alt="how-1" className="w-full" />
                <img src={how2} alt="how-2" className="w-full" />
                <img src={how3} alt="how-3" className="w-full" />
                <img src={how4} alt="how-4" className="w-full" />
            </div>
        </div>
    );
}