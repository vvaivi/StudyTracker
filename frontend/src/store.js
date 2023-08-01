import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './reducers/categories';
import notificationReducer from './reducers/notification';
import tasksReducer from './reducers/tasks';
import userReducer from './reducers/user';
import usersReducer from './reducers/users';

const store = configureStore({
	reducer: {
		categories: categoriesReducer,
		notification: notificationReducer,
		tasks: tasksReducer,
		user: userReducer,
		users: usersReducer,
	},
});

export default store;
