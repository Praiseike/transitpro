import prom1 from '@/assets/home/prom-1.png';
import prom2 from '@/assets/home/prom-2.png';
import prom3 from '@/assets/home/prom-3.png';

const FeatureCard = ({ image, heading, content,color }: any) => {
    return (
        <div className="shadow-lg w-[410px] h-[410px] justify-center border overflow-hidden p-7 bg-[#F5F5F5] hover:bg-white cursor-pointer rounded-[20px] transition duration-300 ease-in-out">
            <div style={{backgroundColor: color}} className="w-20 h-20 flex items-center justify-center rounded-xl mb-6 text-2xl">
                <img src={image} alt='' className="w-7 h-7" />
            </div>
            <h3 className="text-[29px] font-semibold text-gray-900 mb-4 mt-10">{heading}</h3>
            <p className="text-gray-700  font-lato leading-relaxed mt-10">
                {content}
            </p>
        </div>
    );
};


const features = [
    {
      heading: "Onboard New Users with Ease",
      content: "Register new users directly from your promoter dashboard. Once registered, they'll receive an activation link and can log in with their phone number.",
      color: '#FFEC9E6E',
      image: prom1,
    },
    {
      heading: "Track Your Referrals in One Place",
      content: "See all the users you've registered at a glance. Your dashboard gives you full visibility into their activity and engagement.",
      color: '#ECE2FB',
      image: prom2,
    },
    {
      heading: "Earn Commission Automatically",
      content: "Every time your registered users complete a transaction, you earn a commission. It’s passive income made simple.",
      color: '#C3DEFF',
      image: prom3,
    }
  ]
  

export const Section5 = () => {
    return (
        <div className='px-3 lg:px-20 mt-20'>
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

        </div>
    );
}