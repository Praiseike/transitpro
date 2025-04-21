import { useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ActionEnums, IBusiness, IUser } from './types';
import { Context } from '.';

export function useAuth() {
	const context = useContext(Context);
	const queryClient = useQueryClient();

	if (!context) throw new Error('useAuth must be used inside AuthProvider');

	const login = (payload: { user: any; token: string }) => {
		context.dispatch({ type: ActionEnums.SAVE, payload });
		Cookies.set('SESSION_KEY', JSON.stringify(payload.token));
	};

	const signup = (payload: { user: IUser; business: IBusiness; token: string }) => {
		context.dispatch({ type: ActionEnums.SAVE, payload });
		Cookies.set('SESSION_KEY', JSON.stringify(payload));
	};

	const logout = () => {
		context.dispatch({ type: ActionEnums.REMOVE });
		Cookies.remove('SESSION_KEY');
		queryClient.removeQueries();
	};

	const invalidateUserData = () => {
		queryClient.invalidateQueries(['auth',context.state.token] as any);
		context.dispatch({ type: ActionEnums.SAVE, payload: { user: null } });
	};

	return {
		userRefetch: context.userRefetch,
		userData: context.userData,
		...context.state,
		funcs: { login, signup, logout, invalidateUserData },
	};
}
