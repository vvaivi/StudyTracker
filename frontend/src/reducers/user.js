import { createSlice } from '@reduxjs/toolkit';
import { notify } from './notification';
import { clearTasks } from './tasks';
import { clearCategories } from './categories';

import storageService from '../services/storage';
import loginService from '../services/login';

const initialState = null;

const slice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		set(state, action) {
			return action.payload;
		},
		clear() {
			return initialState;
		},
	},
});

export const { set, clear } = slice.actions;

export const loginUser = (credentials) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login(credentials);
			storageService.saveUser(user);
			dispatch(set(user));
		} catch (error) {
			dispatch(notify(error.response.data.error, 'alert'));
		}
	};
};

export const initUser = () => {
	return async (dispatch) => {
		const user = storageService.loadUser();
		dispatch(set(user));
	};
};

export const clearUser = () => {
	return async (dispatch) => {
		storageService.removeUser();

		dispatch(clear());
		dispatch(clearTasks());
		dispatch(clearCategories());
	};
};

export default slice.reducer;
