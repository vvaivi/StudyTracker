const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');
const Joi = require('joi');
const { sendEmail } = require('../utils/email');

router.get('/', async (request, response) => {
	const users = await User.find({});
	response.json(users);
});

router.post('/', async (request, response) => {
	const { username, name, password, verified } = request.body;

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

	const emailSchema = Joi.string().email();
	const validation = emailSchema.validate(username);
	if (validation.error) {
		return response.status(400).json({
			error: 'Invalid email address.',
		});
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		name,
		passwordHash,
		verified,
	});

	const savedUser = await user.save();

	const message = `Please click the link to verify your account ${process.env.BASE_URL}/api/users/verify/${user.id}`;
	await sendEmail(user.username, 'Verify your account', message);

	response.status(201).json(savedUser);
});

router.get('/verify/:id', async (request, response) => {
	const { username, name, passwordHash, verified } = request.body;

	const user = await User.findByIdAndUpdate(
		request.params.id,
		{ username, name, passwordHash, verified: true },
		{ new: true }
	);

	if (!user) {
		return response.status(400).json({
			error: 'User not found.',
		});
	}

	response.status(201).json('Account verified');
});

router.get('/:id', async (request, response) => {
	const user = await User.findById(request.params.id);

	response.json(user);
});

module.exports = router;
