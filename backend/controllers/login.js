const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');

router.post('/', async (request, response) => {
	const { username, password } = request.body;

	const user = await User.findOne({ username });

	if (!user) {
		return response.status(401).json({ error: 'Username does not match to any user.' });
	}

	const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

	if (!passwordCorrect) {
		return response.status(401).json({
			error: 'Invalid password.',
		});
	}

	if (!(user && user.verified)) {
		return response.status(401).json({
			error: 'unverified account',
		});
	}

	const userForToken = {
		username: user.username,
		id: user.id,
		expiresIn: 60 * 60,
	};

	const token = jwt.sign(userForToken, process.env.SECRET);

	response.status(200).send({ token, username: user.username, id: user.id, name: user.name });
});

module.exports = router;
