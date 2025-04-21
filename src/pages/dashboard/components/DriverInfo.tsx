import React from 'react';
import { Input } from '../../../components/Input';
import driverImg from '../../../assets/driver.png'; 
import Images from '../../../assets/images';

interface DriverInfoProps {
    isOpen: boolean;
    onClose: () => void;
    driver: {
        image: string;
        name: string;
        email: string;
        phone: string;
    };
}

const DriverInfo: React.FC<DriverInfoProps> = ({ isOpen, onClose, driver }) => {
    return (
        <div
            className={`fixed inset-0 z-50 transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            ></div>

            {/* Panel */}
            <div className="absolute right-0 top-0 h-full w-[35%] bg-white shadow-lg p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-16">
                    <h2 className="text-2xl darker-grotesque-600 font-bold">Driver Information</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <img src={Images.cancelIcon} alt="Close" />
                    </button>
                </div>

                {/* Driver Image */}
                <div className="mb-6">
                    <img
                        src={driver.image || driverImg} // Use the provided driver image or fallback
                        alt="Driver"
                        className="w-full rounded-lg object-cover"
                    />
                </div>

                {/* Driver Details */}
                <div className="space-y-4">
                    <Input
                        label="Driver Name"
                        value={driver.name}
                        name="name"
                        onChange={() => {}}
                        placeholder="Driver Name"
                        readOnly
                    />
                    <Input
                        label="Email Address"
                        value={driver.email}
                        name="email"
                        onChange={() => {}}
                        placeholder="Email Address"
                        readOnly
                    />
                    <Input
                        label="Phone Number"
                        value={driver.phone}
                        name="phone"
                        onChange={() => {}}
                        placeholder="Phone Number"
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
};

export default DriverInfo;