import { createSlice } from '@reduxjs/toolkit';
import { notify } from './notification';

import usersService from '../services/users';

const slice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		set(state, { payload }) {
			return payload;
		},
		add(state, { payload }) {
			return state.concat(payload);
		},
	},
});

const { set, add } = slice.actions;

export const initializeUsers = () => {
	return async (dispatch) => {
		const data = await usersService.getAll();
		dispatch(set(data));
	};
};

export const newUserSignUp = (user) => {
	return async (dispatch) => {
		try {
			const data = await usersService.createNew(user);
			dispatch(add(data));
			dispatch(notify('New account created, check your email to verify it!'));
		} catch (error) {
			dispatch(notify(error.response.data.error, 'alert'));
		}
	};
};

export const guestUserSignUp = () => {
	return async (dispatch) => {
		try {
			const data = await usersService.createGuest();
			dispatch(add(data));

			return data;
		} catch (error) {
			// Prepare for possible duplicates in guest users
			dispatch(notify('Unexpected error, please try again.', 'alert'));
		}
	};
};

export default slice.reducer;
