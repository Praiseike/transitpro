import { useEffect } from 'react';
import { fetcher } from '../api';
import { useAuth } from '../contexts/auth/hooks';


export default function useFetcher() {
	const auth = useAuth();

	useEffect(() => {
		const requestInterceptor = fetcher.interceptors.request.use(
			(config) => {
				if (config.headers && !config.headers?.Authorization && auth.token)
					config.headers.Authorization = `Bearer ${auth.token}`;

				return config;
			},
			async (error) => await Promise.reject(error)
		);

		const responseInterceptor = fetcher.interceptors.response.use(
			(response: any) => response,
			async (error: any) => {
				const prevRequest = error?.config;
				if (
					error?.response?.data.message === 'Unauthenticated.' &&
					!prevRequest?.sent
				) {
					auth.funcs.logout();
				}
				return await Promise.reject(error);
			}
		);

		return () => {
			fetcher.interceptors.request.eject(requestInterceptor);
			fetcher.interceptors.response.eject(responseInterceptor);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth.token]);

	return fetcher;
}
