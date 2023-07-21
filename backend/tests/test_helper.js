const User = require('../models/user');
const Task = require('../models/task');
const Category = require('../models/category');

const initialUsers = [
	{
		username: 'studytrackerverify@gmail.com',
		name: 'Test Person',
		password: 'secret',
		verified: true,
	},
	{
		username: 'testuser2',
		name: 'Test Person 2',
		password: 'private',
	},
];

const initialTasks = [
	{
		title: 'make coffee',
		deadline: '2029-01-01T12:00',
		quantity: 1,
	},
	{
		title: 'make cake',
		deadline: '2029-01-01T12:00',
		quantity: 3,
		usedTime: 2,
	},
];

const initialCategories = [
	{
		name: 'studying',
		tasks: [new Task(initialTasks[0])],
	},
	{
		name: 'cooking',
		tasks: [new Task(initialTasks[1])],
	},
];

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

const tasksInDb = async () => {
	const tasks = await Task.find({});
	return tasks.map((task) => task.toJSON());
};

const categoriesInDb = async () => {
	const categories = await Category.find({});
	return categories.map((category) => category.toJSON());
};

module.exports = {
	initialUsers,
	usersInDb,
	initialTasks,
	tasksInDb,
	initialCategories,
	categoriesInDb,
};
