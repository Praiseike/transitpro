import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { fetcher } from '../../../api';
import queryUrls from '../../../constants/queryUrls';
import { Spinner } from '../../../components/Spinner';
import { CustomSelect, Input } from '../../../components/Input';
import { Input as AInput, Select } from 'antd';
import Images from '../../../assets/images';

const trucks = [
    { name: 'truck 1', id: 1 },
    { name: 'truck 2', id: 2 },
    { name: 'truck 3', id: 3 },
]


interface AddDriverModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDriverAdded: () => void; // Callback to refresh the driver list after adding
}

export const AddDriverModal: React.FC<AddDriverModalProps> = ({ isOpen, onClose, onDriverAdded }) => {
    const [state, setState] = useState({
        vehicle_id: '',
        email: '',
        phone: '',
    });

    const [errors, setErrors] = useState({
        vehicle_id: '',
        email: '',
        phone: '',
    });

    const [truck, setTruck] = useState(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
        setErrors({ ...errors, [name]: '' }); 
    };

    const validate = () => {
        const newErrors: any = {};
        if (!state.vehicle_id.trim()) newErrors.vehicle_id = 'Please select a vehicle';
        if (!state.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!state.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10,15}$/.test(state.phone)) {
            newErrors.phone = 'Invalid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        submitMutation.mutate(state);
    };

    const submitMutation = useMutation({
        mutationFn: async (payload: any) => {
            const response = await fetcher.post(queryUrls.ADD_DRIVER, payload);
            return response.data;
        },
        onSuccess: (response: any) => {
            toast.success('Driver added successfully');
            onDriverAdded(); // Refresh the driver list
            onClose(); // Close the modal
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to add driver');
        },
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white shadow-lg w-[90%] max-w-lg p-6">
                <div className='mb-10 flex items-center justify-between'>
                    <h2 className="text-xl">Add a driver</h2>
                    <button onClick={() => onClose()}>
                        <img src={Images.cancelIcon} alt="" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="darker-grotesque-500 text-[18px] mb-4 inline-block text-[#131313]">Driver Phone Number</label>
                        <AInput
                            addonBefore="+234"
                            value={state.phone}
                            name="phone"
                            onChange={onChange}
                            placeholder="8012345678"
                            maxLength={10}
                            allowClear
                            size='large'
                        />

                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                        <Input
                            type="email"
                            name="email"
                            label="Driver's Email Address"
                            value={state.email}
                            onChange={onChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>

                        <CustomSelect
                            options={trucks}
                            label="Select Truck"
                            onChange={(truck: any) => setTruck(truck)}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.vehicle_id}</p>}

                    </div>
                </div>
                <div className="mt-10 flex justify-end space-x-4">
                    <button
                        onClick={handleSubmit}
                        disabled={submitMutation.isPending}
                        className={'w-full h-12 mt-7 flex items-center justify-center gap-2 rounded bg-primary text-xl text-black darker-grotesque-600'}
                    >
                        {submitMutation.isPending ? <Spinner /> : 'Assign'}
                    </button>

                </div>
            </div>
        </div>
    );
};