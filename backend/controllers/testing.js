const router = require('express').Router();
const User = require('../models/user');

router.post('/reset', async (response) => {
	await User.deleteMany({});

	response.status(204).end();
});

module.exports = router;
