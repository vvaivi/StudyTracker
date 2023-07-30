let token = null;

const setUser = (user) => {
	window.localStorage.setItem(process.env.STORAGE_KEY, JSON.stringify(user));
	token = user.token;
};

const getUser = () => {
	const loggedUserJSON = window.localStorage.getItem(process.env.STORAGE_KEY);
	if (loggedUserJSON) {
		const user = JSON.parse(loggedUserJSON);
		token = user.token;
		return user;
	}

	return null;
};

const clearUser = () => {
	localStorage.clear();
	token = null;
};

export default {
	setUser,
	getUser,
	clearUser,
};
