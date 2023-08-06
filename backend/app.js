const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { errorHandler } = require('./utils/middleware');
const logger = require('./utils/logger');

const tasksRouter = require('./controllers/tasks');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const categoriesRouter = require('./controllers/categories');

logger.info('connecting to', config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message);
	});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/categories', categoriesRouter);

if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing');
	app.use('/api/testing', testingRouter);
}

app.use(errorHandler);

module.exports = app;
