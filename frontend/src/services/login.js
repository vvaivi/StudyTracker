import commonService from './common';

const loginService = {
	login: (credentials) => {
		return commonService.createNew('/api/login', credentials);
	},
};

export default loginService;
