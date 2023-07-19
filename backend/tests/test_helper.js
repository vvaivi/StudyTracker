const User = require('../models/user');

const initialUsers = [
	{
		username: 'testuser',
		name: 'Test Person',
	},
	{
		username: 'testuser2',
		name: 'Test Person 2',
	},
];

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

module.exports = {
	initialUsers,
	usersInDb,
};
