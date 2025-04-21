import 'react-toastify/dist/ReactToastify.min.css';
import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './auth';


// Create a client
const queryClient = new QueryClient();

export default function AppProviders() {
	const location = useLocation();

	useLayoutEffect(() => {
		document.documentElement.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, [location.pathname]);

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<SessionRewindProvider>
						<Outlet />
					</SessionRewindProvider>
				</AuthProvider>
				<ToastContainer className='text-sm' />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</>
	);
}
