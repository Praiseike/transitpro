import React, { useState, DragEvent, ChangeEvent, useEffect } from 'react';
import { Input } from '../../../components/Input';
import Images from '../../../assets/images';
import { toast } from 'react-toastify';
import queryUrls from '../../../constants/queryUrls';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Spinner } from '../../../components/Spinner';
import useFetcher from '../../../hooks/useFetcher';

interface AddTruckModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTruckAdded: () => void;
}

const AddTruckModal: React.FC<AddTruckModalProps> = ({ isOpen, onClose, onTruckAdded }) => {
    const [image, setImage] = useState<File | null>(null);
    const [brand, setBrand] = useState('');
    const [regNumber, setRegNumber] = useState('');
    const [preview, setPreview] = useState<string | null>(null);
    const [errors, setErrors] = useState({
        brand: '',
        regNumber: '',
        image: '',
    });
    

    useEffect(() => {
        setImage(null);
        setBrand('');
        setRegNumber('');
      },[])

    const fetcher = useFetcher();
    const queryClient = useQueryClient();

    const submitMutation = useMutation({
        mutationFn: async (payload: any) => {
            const response = await fetcher.post(queryUrls.TRUCKS, payload);
            return response.data;
        },
        
        onSuccess: (response: any) => {
            toast.success('Truck added successfully');
            onTruckAdded(); // Refresh the truck list
            onClose(); // Close the modal
            queryClient.invalidateQueries(['trucks'] as any);
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to add truck');
        },
    });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setErrors({ ...errors, image: '' }); // Clear image error
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setErrors({ ...errors, image: '' }); // Clear image error
        }
    };

    const validate = () => {
        const newErrors: any = {};
        if (!brand.trim()) newErrors.brand = 'Vehicle brand is required';
        if (!regNumber.trim()) newErrors.regNumber = 'Registration number is required';
        if (!image) newErrors.image = 'Vehicle image is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        const formData = new FormData();
        if (image) formData.append('image', image);
        formData.append('name', brand);
        formData.append('registration_number', regNumber);

        submitMutation.mutate(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-lg p-6">
                <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-xl">Add a new truck</h2>
                    <button onClick={() => onClose()}>
                        <img src={Images.cancelIcon} alt="Close" />
                    </button>
                </div>

                {/* Upload truck image */}
                <div
                    className={`border-[3px] rounded-lg border-dashed p-4 text-center mb-4 cursor-pointer ${
                        errors.image ? 'border-red-500 bg-red-50' : 'border-yellow-400 bg-yellow-50'
                    }`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('imageUpload')?.click()}
                >
                    {preview ? (
                        <img src={preview} alt="Preview" className="mx-auto max-h-48 object-contain" />
                    ) : (
                        <>
                            <p className="font-semibold">
                                Click to upload <span className="text-gray-500">or drag and drop</span>
                            </p>
                            <p className="text-sm text-gray-500">
                                SVG, PNG or JPG <br />
                                <span className="text-xs">(max. 800x400px)</span>
                            </p>
                        </>
                    )}
                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

                {/* Form Fields */}
                <Input
                    label="Vehicle Brand"
                    value={brand}
                    name="brand"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setBrand(e.target.value);
                        setErrors({ ...errors, brand: '' }); // Clear brand error
                    }}
                    placeholder="Volkswagen"
                />
                {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}

                <Input
                    label="Vehicle Registration Number"
                    value={regNumber}
                    name="regNumber"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setRegNumber(e.target.value);
                        setErrors({ ...errors, regNumber: '' }); // Clear registration number error
                    }}
                    placeholder="012JDJSJSAS22"
                />
                {errors.regNumber && <p className="text-red-500 text-sm mt-1">{errors.regNumber}</p>}

                {/* Done Button */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleSubmit}
                        disabled={submitMutation.isPending}
                        className={'w-full h-12 mt-7 flex items-center justify-center gap-2 rounded bg-primary text-xl text-black darker-grotesque-600'}
                    >
                        {submitMutation.isPending ? <Spinner /> : 'Done'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTruckModal;