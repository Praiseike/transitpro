import { useMutation } from "@tanstack/react-query";
import queryUrls from "../../constants/queryUrls";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useFetcher from "../../hooks/useFetcher";
import { ChangeEvent, useEffect, useState } from "react";
import { Spinner } from "../../components/Spinner";
import { Input } from "../../components/Input";
import { useAuth } from "../../contexts/auth/hooks";

export const Settings = () => {

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

    const auth = useAuth();

    useEffect(() => {
        setState({
            ...state,
            name: auth.userData?.name || '',
            email: auth.userData?.email || '',
            home_address: auth.userData?.address || '',
        })
    }, [])

    const fetcher = useFetcher();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setState({ ...state, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error when user types
    };

    const handleSubmit = () => {
        submitMutation.mutate(state);
    };

    const submitMutation = useMutation({
        mutationFn: async (payload: any) => {
            const response = await fetcher.post(queryUrls.PROFILE_UPDATE, payload);
            return response.data;
        },
        onSuccess: (response: any) => {
            toast.success(response.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return (
        <div className="px-10">
            <h1 className="text-[0.5rem] lg:text-[1.8rem]">Profile Settings</h1>
            <div className="mt-10 max-w-lg">
                <p className=" darker-grotesque-400 mb-4 text-[25px]">
                    Update profile information
                </p>

                <div className="">
                    <Input
                        label="Name"
                        placeholder="Abel Usman Gomeg"
                        value={state.name}
                        name="name"
                        onChange={onChange}
                        error={errors.name} 
                    />

                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                        value={auth.userData?.email}
                        name="email"
                        readOnly
                        onChange={onChange}
                        error={errors.email} 
                    />

                    <Input
                        label="Phone"
                        // placeholder="email@gmail.com"
                        value={auth.userData?.phone_number}
                        name="phone"
                        readOnly
                        onChange={onChange}
                        error={errors.email} 
                    />

                    <Input
                        label="Home address"
                        placeholder="43, Big Gonna way, Abeorji street, Lagos."
                        value={state.home_address}
                        name="home_address"
                        onChange={onChange}
                        error={errors.home_address} 
                    />
    <div className="flex justify-end">

                    <button
                        onClick={handleSubmit}
                        disabled={submitMutation.isPending}
                        className={
                            'w-32 h-14 mt-7 flex  items-center justify-center gap-2 rounded bg-primary text-2xl text-black darker-grotesque-500'
                        }
                        >
                        {submitMutation.isPending ? <Spinner /> : 'Save'}
                    </button>
                        </div>
                </div>
            </div>
        </div>
    );
}