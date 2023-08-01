import { createSlice } from '@reduxjs/toolkit';
import tasksService from '../services/tasks';

const initialState = [];

const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		set(state, { payload }) {
			return payload;
		},
		add(state, { payload }) {
			return state.concat(payload);
		},
		remove(state, { payload }) {
			return state.filter((t) => t.id !== payload);
		},
		alter(state, { payload }) {
			return state.map((t) => (t.id !== payload.id ? t : payload));
		},
		clear(state, { payload }) {
			return initialState;
		},
	},
});

const { set, add, remove, alter, clear } = slice.actions;

export const initializeTasks = () => {
	return async (dispatch) => {
		const data = await tasksService.getAll();
		dispatch(set(data));
	};
};

export const addTask = (object) => {
	return async (dispatch) => {
		const data = await tasksService.createNew(object);
		dispatch(add(data));
	};
};

export const updateTask = (object) => {
	return async (dispatch) => {
		const data = await tasksService.updateTask(object.id, object);
		dispatch(alter(data));
	};
};

export const removeTask = (object) => {
	return async (dispatch) => {
		await tasksService.deleteTask(object.id);
		dispatch(remove(object.id));
	};
};

export const clearTasks = () => {
	return async (dispatch) => {
		dispatch(clear());
	};
};

export default slice.reducer;
