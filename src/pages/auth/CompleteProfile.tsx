import { ChangeEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from '../../components/Spinner';
import queryUrls from '../../constants/queryUrls';
import img from '@/assets/auth/register.png';
import { Input } from '../../components/Input';
import useFetcher from '../../hooks/useFetcher';

export const CompleteProfile = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        home_address: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        home_address: '',
    });

    const navigate = useNavigate();

    const fetcher = useFetcher();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setState({ ...state, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error when user types
    };

    const validate = () => {
        const newErrors: any = {};
        if (!state.name.trim()) newErrors.name = 'Name is required';
        if (!state.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!state.home_address.trim()) newErrors.home_address = 'Address is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        submitMutation.mutate(state);
    };

    const submitMutation = useMutation({
        mutationFn: async (payload: any) => {
            const response = await fetcher.post(queryUrls.PROFILE_UPDATE, payload);
            return response.data;
        },
        onSuccess: (response: any) => {
            toast.success(response.message);
            navigate('/dashboard'); // Redirect after successful submission
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return (
        <div className="">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 lg:px-8 lg:py-8">
                <img src={img} alt="" className="hidden lg:block rounded-[30px] bg-black w-[680px]" />
                <div className="lg:py-10 lg:pl-20">
                    <img src="logo-black.png" alt="" className="w-[12rem]" />
                    <div className="h-full darker-grotesque-400 max-w-lg mt-24">
                        <div>
                            <h1 className="text-[47px] darker-grotesque-700">
                                Complete Registration
                            </h1>
                            <p className=" darker-grotesque-400 mb-4 text-[25px]">
                                Complete your details to unlock full access.
                            </p>

                            <div className="">
                                <Input
                                    label="Name"
                                    placeholder="Abel Usman Gomeg"
                                    value={state.name}
                                    name="name"
                                    onChange={onChange}
                                    error={errors.name} // Pass error message
                                />

                                <Input
                                    label="Email"
                                    placeholder="email@gmail.com"
                                    value={state.email}
                                    name="email"
                                    onChange={onChange}
                                    error={errors.email} // Pass error message
                                />

                                <Input
                                    label="Home address"
                                    placeholder="43, Big Gonna way, Abeorji street, Lagos."
                                    value={state.home_address}
                                    name="home_address"
                                    onChange={onChange}
                                    error={errors.home_address} // Pass error message
                                />

                                <button
                                    onClick={handleSubmit}
                                    disabled={submitMutation.isPending}
                                    className={
                                        'w-full h-14 mt-7 flex items-center justify-center gap-2 rounded bg-primary text-2xl text-black darker-grotesque-600'
                                    }
                                >
                                    {submitMutation.isPending ? <Spinner /> : 'Continue'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
