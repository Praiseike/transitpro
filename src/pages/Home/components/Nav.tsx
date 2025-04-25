import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../contexts/auth/hooks";

export const Nav = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const auth = useAuth();
    const signedIn = !!auth.token
    const hasDashboard = auth.userData?.account_type == 'truck_owner';

    return (
        <nav className="flex w-full bg-transparent py-10 justify-between items-center">
            <img src="/logo.png" alt="Logo" className="lg:w-[190px]" />
            <button
                className="block md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                </svg>
            </button>
            <ul
                className={`${
                    isMobileMenuOpen ? "block inset-0" : "hidden"
                } md:flex text-[15px] flex-col md:flex-row justify-between text-white absolute md:static gap-7 left-0 w-full md:w-auto bg-black md:bg-transparent p-5 md:p-0`}
            >
                {/* Close button for mobile menu */}
                <li className="md:hidden flex justify-end">
                    <button
                        className="text-white text-2xl"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        &times;
                    </button>
                </li>
                <li>
                    <a href="/" className="text-white inline-block max-lg:mb-20 max-lg:text-3xl hover:text-gray-400">FEATURES</a>
                </li>
                <li>
                    <a href="/about" className="text-white inline-block max-lg:mb-20 max-lg:text-3xl hover:text-gray-400">TRUCK OWNERS</a>
                </li>
                <li>
                    <a href="/contact" className="text-white inline-block max-lg:mb-20 max-lg:text-3xl hover:text-gray-400">BE A PROMOTER</a>
                </li>
                <li>
                    <a href="/contact" className="text-white inline-block max-lg:mb-20 max-lg:text-3xl hover:text-gray-400">CONTACT US</a>
                </li>
            </ul>
            <Link
                to={signedIn ? '/dashboard' : '/register'}
                className="hidden md:block text-primary border-primary px-12 py-3 text-sm rounded border"
            >
                { signedIn && hasDashboard ? 'Dashboard' : 'Register'}
            </Link>
        </nav>
    );
};