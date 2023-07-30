const saveUser = (user) => {
	localStorage.setItem(process.env.STORAGE_KEY, JSON.stringify(user));
};

const loadUser = () => {
	return JSON.parse(window.localStorage.getItem(process.env.STORAGE_KEY));
};

const removeUser = () => {
	localStorage.removeItem(process.env.STORAGE_KEY);
};

export default {
	saveUser,
	loadUser,
	removeUser,
};
