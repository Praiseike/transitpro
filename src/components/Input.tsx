import { useState } from "react";

export const Input = ({ value, readOnly, name, onChange, label, placeholder }: any) => {
    return (
        <div className="flex flex-col gap-3 mb-4">
            <label className="darker-grotesque-500 text-[16px] text-[#131313]">{label}</label>
            <input
                type="text"
                value={value}
                readOnly={readOnly}
                name={name}
                disabled={readOnly}
                onChange={onChange}
                placeholder={placeholder}
                className={`darker-grotesque-500 placeholder:darker-grotesque-300 text-xl placeholder:text-[14px]  py-3 px-4 border rounded ${readOnly ? 'text-gray-500' : 'text-[#131313]'}`}
            />
        </div>
    );
};

export const SearchInput = ({ value, name, onChange, placeholder }: any) => {
    return (
        <div className="flex relative gap-3 py-3 px-3 w-fit border rounded h-11 items-center ">
            <span className="">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1011_3773)">
                        <path d="M13.3702 13.3507L11.126 11.1065" stroke="#131313" strokeWidth="1.00383" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.71978 12.5978C10.4942 12.5978 12.6173 10.4747 12.6173 6.70025C12.6173 2.92584 10.4942 0.802734 6.71978 0.802734C2.94537 0.802734 0.822266 2.92584 0.822266 6.70025C0.822266 10.4747 2.94537 12.5978 6.71978 12.5978Z" stroke="#131313" strokeWidth="1.00383" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1011_3773">
                            <rect width="14.0537" height="14.0537" fill="white" transform="translate(0.0683594 0.0498047)" />
                        </clipPath>
                    </defs>
                </svg>
            </span>
            <input
                type="text"
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                className="outline-none placeholder:darker-grotesque-300 placeholder:text-[14px] text-[#131313]"
            />
        </div>
    );
};

export const CustomSelect = ({ options, value, onChange, label }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option: any) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col gap-3 mb-4 relative">
            <label className="darker-grotesque-500 text-[16px] text-[#131313]">{label}</label>
            <div
                className="darker-grotesque-500 text-xl text-[#131313] py-3 px-4 border rounded cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                {value || "Select an option"}
                <span className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
                    <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 1L9 9L1.28962 1.28961L1 1" stroke="black" stroke-width="1.93939" />
                    </svg>
                </span>
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white border rounded shadow-lg z-10">
                    {options.map((option: any, index: number) => (
                        <div
                            key={index}
                            className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};