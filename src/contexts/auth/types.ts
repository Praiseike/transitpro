import type { Dispatch } from 'react';

export interface IBusiness {
	ulid: string;
	name: string;
	logo: string | null;
	has_interview: boolean;
	has_logo: boolean;
	has_payment_method: boolean;
	website?: string;
	about?: string;
}

export interface IUser {
	ulid: string;
	name: string;
	email: string;
	avatar: string | null;
	resume?: string;
	first_name?: string;
	last_name?: string;
}

export enum ActionEnums {
	SAVE = 'SAVE',
	REMOVE = 'REMOVE',
	UPDATE_AVATAR = 'UPDATE_AVATAR',
}

export interface ActionType {
	type: ActionEnums;
	payload?: any;
}

export interface StateType {
	user: IUser | null;
	token: null | string;
}

export interface ContextType {
	state: StateType;
	dispatch: Dispatch<ActionType>;
	userRefetch: any;
	userData: any;
}
