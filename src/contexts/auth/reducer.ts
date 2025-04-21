import { ActionEnums, ActionType, StateType } from './types';

export default function reducer(state: StateType, action: ActionType) {
	switch (action.type) {
		case ActionEnums.SAVE: {
			return { ...state, ...action.payload };
		}
		case ActionEnums.REMOVE:
			return { ...state, business: null, user: null, token: null };

		default:
			return state;
	}
}
