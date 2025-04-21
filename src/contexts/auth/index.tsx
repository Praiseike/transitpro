import { ReactNode, createContext, useEffect, useReducer, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import reducer from './reducer';
import { ActionEnums, type ContextType, type StateType } from './types';
import { fetcher } from '../../api';
import { queryURLs } from '../../constants';

const initialState: StateType = { user: null, token: null };

export const Context = createContext<ContextType>({
	state: initialState,
	dispatch: () => null,
	userRefetch: null,
	userData: null,
});

export default function Provider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const location = useLocation();

	const [isLoading, setLoading] = useState(true);

	const query = useQuery({
		queryKey: ['auth'],
		queryFn: async () => {
			if (location.pathname !== '/register') {
				if (!state.token) return null;
				const res = await fetcher(queryURLs.GET_USER, {
					headers: { Authorization: `Bearer ${state.token}` },
				});
				return res.data?.data;
			} else {
				return {};
			}
		}
	});

	useEffect(() => {
		if (location.pathname !== '/register') {
			if (!query.isLoading) {
				if (!query.isFetching && query.data && !state.user) {
					dispatch({ type: ActionEnums.SAVE, payload: { user: query.data } });
				}
				setLoading(false);
			}
		} else {
			setLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, state]);

	useEffect(() => {
		const unparsed_token = Cookies.get('SESSION_KEY');
		if (unparsed_token) {
			if (unparsed_token != null) {
				const token = JSON.parse(unparsed_token);
				dispatch({ type: ActionEnums.SAVE, payload: { token } });
			}
		}
	},[]);


	return (
		<Context.Provider value={{ state, dispatch, userRefetch: query.refetch, userData: query.data }}>
			{!state.token && location.pathname == '/login' ? (
				children
			) : isLoading || query.isLoading ? (
				<div className='w-full h-full bg-red-white text-black flex items-center justify-center'>
					loading
				</div>
			) : (
				children
			)}
		</Context.Provider>
	);
}
