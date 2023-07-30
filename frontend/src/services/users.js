import commonService from './common';

const usersService = {
	getAll: () => {
		return commonService.getAll('/api/users');
	},

	createNew: (user) => {
		return commonService.createNew('/api/users', user);
	},

	createGuest: () => {
		return commonService.createNew('/api/users/guest');
	},

	deleteUser: (id) => {
		return commonService.remove('/api/users', id);
	},
};

export default usersService;
