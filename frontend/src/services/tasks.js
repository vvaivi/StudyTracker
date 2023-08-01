import commonService from './common';

const tasksService = {
	getAll: () => {
		return commonService.getAll('/api/tasks');
	},

	createNew: (task) => {
		return commonService.createNew('/api/tasks', task);
	},

	deleteTask: (id) => {
		return commonService.remove('/api/tasks', id);
	},

	updateTask: (id, task) => {
		return commonService.update('/api/tasks', id, task);
	},
};

export default tasksService;
