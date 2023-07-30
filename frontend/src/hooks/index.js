import { useDispatch } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';

import { initializeUsers } from '../reducers/users';
import { initUser, clearUser } from '../reducers/user';
import { notify } from '../reducers/notification';

import usersService from '../services/users';
import storageService from '../services/storage';

export const useInitialization = () => {
	const dispatch = useDispatch();

	return () => {
		dispatch(initializeUsers());
		dispatch(initUser());
	};
};

export const useField = (type, initialValue = '') => {
	const [value, setValue] = useState(initialValue);

	const onChange = (event) => {
		setValue(event.target.value);
	};

	return {
		value,
		type,
		setValue,
		onChange,
	};
};

export const useToggleValue = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	const toggleValue = useCallback(() => {
		setValue((value) => !value);
	}, []);

	return {
		value,
		toggleValue,
	};
};

export const useNotification = () => {
	const dispatch = useDispatch();

	return (message, type = 'info') => {
		dispatch(notify(message, type));
	};
};

const tokenExpired = (token) => {
	const tokenPayload = JSON.parse(atob(token.split('.')[1]));
	const expirationTime = (tokenPayload.expiresIn + tokenPayload.iat) * 1000;

	return expirationTime < Date.now();
};

export const useTokenExpirationCheck = () => {
	const dispatch = useDispatch();
	const user = storageService.loadUser();

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (user && tokenExpired(user.token)) {
				if (user.guest) {
					usersService.deleteUser(user.id);
				}
				dispatch(clearUser());
				dispatch(notify('Session expired, please sign in again.', 'alert'));
			}
		}, 60000);

		return () => {
			clearInterval(intervalId);
		};
	}, [user]);
};
