import React from 'react';
import { Input } from '../../../components/Input';
import truckImg from '../../../assets/truck.png';
import Images from '../../../assets/images';


interface TruckInfoProps {
    isOpen: boolean;
    onClose: () => void;
    truck: {
        image_url: string;
        name: string;
        registration_number: string;
    } | null;
}

const TruckInfo: React.FC<TruckInfoProps> = ({ isOpen, onClose, truck }) => {
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
                    <h2 className="text-2xl darker-grotesque-600 font-bold">Truck Information</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <img src={Images.cancelIcon} alt=""/>
                    </button>
                </div>

                {/* Truck Image */}
                <div className="mb-6">
                    <img
                        src={truck?.image_url}
                        alt="Truck"
                        className="w-full rounded-lg object-cover"
                    />
                </div>

                {/* Truck Details */}
                <div className="space-y-4">
                    <Input
                        label="Vehicle Brand"
                        value={truck?.name}
                        name="brand"
                        onChange={() => {}}
                        placeholder="Vehicle Brand"
                        readOnly
                    />
                    <Input
                        label="Vehicle Registration Number"
                        value={truck?.registration_number}
                        name="regNumber"
                        onChange={() => {}}
                        placeholder="Vehicle Registration Number"
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
};

export default TruckInfo;