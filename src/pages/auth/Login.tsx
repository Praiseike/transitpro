import img from '@/assets/auth/register.png';
import { useMutation } from '@tanstack/react-query';
import { Input } from 'antd';
import { useState } from 'react';
import { fetcher } from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import queryUrls from '../../constants/queryUrls';
import { Spinner } from '../../components/Spinner';

const types = [
    { label: 'Business Owner', value: 'business' },
    { label: 'Agent', value: 'agent' },
    { label: 'Driver', value: 'driver' },
    { label: 'Truck Owner', value: 'truck_owner' }
];


const AccountType = ({ type, setType }: any) => {
    const isActive = (value: string) => type.value == value;
    return (
        <div className='w-full'>
            <ul className='w-full flex items-center gap-2 justify-between h-[56px] px-3  rounded-lg bg-[#EBEBEB]'>
                {types.map((type) => (
                    <li
                        key={type.value}
                        className={`px-3 ${isActive(type.value) ? 'bg-black text-primary' : ' hover:bg-neutral-300'} py-2 rounded-lg grow text-center cursor-pointer`}
                        onClick={() => setType(type)}
                    >
                        {type.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const Login = () => {
    const [accountType, setAccounType] = useState<any>(types[0]);
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    // const queryClient = useQueryClient();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (/^\d*$/.test(value) && value.length <= 10) {
            setPhone(value);
        }
    };


    const handleSubmit = () => {
        const payload = {
            phone_number: '+234'+phone,
            account_type: accountType.value
        }

        if (phone.length < 10) return toast.error('Invalid phone number');

        submit_mutation.mutate(payload);
    }


    const submit_mutation = useMutation({
        mutationFn: async (payload: any) => {
            const response = await fetcher.post(queryUrls.AUTH_LOGIN, payload);
            return response.data;
        },
        onSuccess: (response) => {
            toast.success(response.message)
            navigate('/verify', { state: { phone, account_type: accountType }});
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    return (
        <div className="">
            <div className='grid grid-cols-1 lg:grid-cols-2 px-4 lg:px-8 py-8'>
                <img src={img} alt='' className='hidden lg:block rounded-[30px] bg-black w-[680px]' />
                <div className='py-10 lg:pl-20'>
                    <img src='logo-black.png' alt='' className='w-[12rem]' />
                    <div className='h-full darker-grotesque-400 max-w-lg mt-24'>
                        <div>
                            <h1 className='text-[47px] darker-grotesque-700'>Create an Account</h1>
                            <p className='my-2 darker-grotesque-400 mb-4 text-[25px]'>Start your journey with TransitPro today. Sign up as</p>
                            <AccountType type={accountType} setType={setAccounType} />
                            <div className='mt-5'>
                                <label className='mb-5 text-xl inline-block darker-grotesque-500'>Phone number</label>
                                <Input
                                    addonBefore="+234"
                                    value={phone}
                                    onChange={onChange}
                                    placeholder="8012345678"
                                    maxLength={10}
                                    allowClear
                                    size='large'
                                />
                                <button
                                    onClick={handleSubmit}
                                    disabled={submit_mutation.isPending}
                                    className={'w-full h-14 mt-7 flex items-center justify-center gap-2 rounded bg-primary text-2xl text-black darker-grotesque-600'}
                                >
                                    {submit_mutation.isPending ? <Spinner /> : 'Continue'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
