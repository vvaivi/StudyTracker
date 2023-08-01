import commonService from './common';

const categoryService = {
	getAll: () => {
		return commonService.getAll('/api/categories');
	},

	updateCategory: (id, category) => {
		return commonService.update('/api/categories', id, category);
	},
};

export default categoryService;
