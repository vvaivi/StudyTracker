const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const errorHandler = (error, request, response, next) => {
	logger.error(error.message);
	next(error);
};

const userExtractor = async (request, response, next) => {
	const authorization = request.get('authorization');

	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET);
		if (decodedToken) {
			request.user = await User.findById(decodedToken.id);
		}
	}

	next();
};

module.exports = {
	errorHandler,
	userExtractor,
};
