import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OTPInput from 'react-otp-input';
import { Spinner } from '../../components/Spinner';
import { fetcher } from '../../api';
import queryUrls from '../../constants/queryUrls';
import { useAuth } from '../../contexts/auth/hooks';
import img from '@/assets/auth/register.png';

export const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const [counter, setCounter] = useState(600); // 10 minutes in seconds
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const navigate = useNavigate();
    const { funcs } = useAuth();
    const { state } = useLocation();
    const phone = state.phone;

    // Countdown timer
    useEffect(() => {
        if (counter > 0) {
            const timer = setInterval(() => {
                setCounter((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setIsResendDisabled(false);
        }
    }, [counter]);

    const handleSubmit = () => {
        const payload = {
            phone_number: '+234' + phone,
            fcm: 'no device',
            code: otp,
        };

        if (phone.length < 10) return toast.error('Invalid phone number');

        submitMutation.mutate(payload);
    };

    const handleResend = () => {
        const payload = {
            phone_number: '+234' + phone,
        };

        resendMutation.mutate(payload);
    };

    const submitMutation = useMutation({
        mutationFn: async (payload: any) => {
            const response = await fetcher.post(queryUrls.AUTH_OTP, payload);
            return response.data;
        },
        onSuccess: (response: any) => {
            toast.success(response.message);
            if(state.account_type !== 'truck_owner')
                navigate('/complete');
            funcs.login({ user: { phone }, token: response.data.token });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const resendMutation = useMutation({
        mutationFn: async (payload: any) => {
            const response = await fetcher.post(queryUrls.AUTH_RESEND_OTP, payload);
            return response.data;
        },
        onSuccess: () => {
            toast.success('OTP resent successfully');
            setCounter(600); // Reset the timer to 10 minutes
            setIsResendDisabled(true);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 lg:px-8 lg:py-8">
                <img src={img} alt="" className="hidden lg:block rounded-[30px] bg-black w-[680px]" />
                <div className="lg:py-10 lg:pl-20">
                    <img src="logo-black.png" alt="" className="w-[12rem]" />
                    <div className="h-full darker-grotesque-400 max-w-lg mt-24">
                        <div>
                            <h1 className="text-[47px] darker-grotesque-700">Verification</h1>
                            <p className="my-2 darker-grotesque-400 mb-4 text-[25px]">
                                We sent a verification code to +234{phone}
                            </p>

                            <div className="mt-5">
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={4}
                                    inputStyle={
                                        '!w-16 h-16 lg:!w-24 lg:h-24 text-2xl rounded mr-5 text-black border'
                                    }
                                    containerStyle={''}
                                    renderInput={(props) => <input {...props} />}
                                />
                                <span className="mt-4 text-xl inline-block darker-grotesque-500">
                                    Didn't receive?{' '}
                                    {isResendDisabled ? (
                                        <span className="text-xl inline-block darker-grotesque-700">
                                            Resend in {formatTime(counter)}
                                        </span>
                                    ) : (
                                        <button
                                            onClick={handleResend}
                                            disabled={resendMutation.isPending}
                                            className="text-primary underline"
                                        >
                                            Resend OTP
                                        </button>
                                    )}
                                </span>
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
