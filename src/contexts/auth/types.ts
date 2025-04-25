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

	account_status: string;
	account_type:string;
	address: string;
	city: string | null;
	country: string | null;
	created_at: string;
	email: string;
	email_verified_at: string  | null;
	fcm_token: string | null;
	id: number
	invite_code: string | null;
	location: any;
	name: string;
	phone_number: string;
	pin_code: string;
	profile_image: string;
	ratings_count: number;
	ratings_score: number;
	sex: string | null
	state: string | null;
	updated_at: string;
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
	userData: IUser | null;
}
