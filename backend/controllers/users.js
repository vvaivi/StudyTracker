const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');

router.get('/', async (request, response) => {
	const users = await User.find({});
	response.json(users);
});

router.post('/', async (request, response) => {
	const { username, name, password } = request.body;

	if (!password || password.length < 6) {
		return response.status(400).json({
			error: 'Too short password, minimum length is 6 characters.',
		});
	}

	const existingUser = await User.findOne({ username });
	if (existingUser) {
		return response.status(400).json({
			error: 'Username must be unique, this username is already taken.',
		});
	}
	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		name,
		passwordHash,
	});

	const savedUser = await user.save();

	response.status(201).json(savedUser);
});

module.exports = router;
