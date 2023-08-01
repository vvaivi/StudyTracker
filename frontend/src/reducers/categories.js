import { createSlice } from '@reduxjs/toolkit';
import categoryService from '../services/categories';

const initialState = [];

const slice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		set(state, { payload }) {
			return payload;
		},
		add(state, { payload }) {
			return state.concat(payload);
		},
		alter(state, { payload }) {
			return state.map((s) => (s.id !== payload.id ? s : payload));
		},
		clear(state, { payload }) {
			return initialState;
		},
	},
});

const { set, add, alter, clear } = slice.actions;

export const initializeCategories = () => {
	return async (dispatch) => {
		const data = await categoryService.getAll();
		dispatch(set(data));
	};
};

export const addCategory = (object) => {
	return async (dispatch) => {
		dispatch(add(object));
	};
};

export const updateCategory = (object) => {
	return async (dispatch) => {
		const data = await categoryService.updateCategory(object.id, object);
		dispatch(alter(data));
	};
};

export const clearCategories = () => {
	return async (dispatch) => {
		dispatch(clear());
	};
};

export default slice.reducer;
