const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);
const User = require('../models/user');

beforeEach(async () => {
	await User.deleteMany({});
});

afterAll(async () => {
	await mongoose.disconnect();
});

describe('when there are some users in the database', () => {
	beforeEach(async () => {
		await User.insertMany(helper.initialUsers);
	});

	test('those are returned as json', async () => {
		const response = await api
			.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(response.body).toHaveLength(helper.initialUsers.length);
	});

	test('those are identified by field id', async () => {
		const response = await api
			.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(response.body[0].id).toBeDefined();
	});
});

describe('user creation', () => {
	beforeEach(async () => {
		const user = new User({ username: 'user', password: 'secret' });
		await user.save();
	});

	test('fails if password is too short', async () => {
		const newUser = {
			username: 'newuser',
			password: 'p',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);
	});

	test('creation fails with proper status code and message if username already taken', async () => {
		const newUser = {
			username: 'user',
			name: 'User User',
			password: 'notpublic',
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('Username must be unique, this username is already taken.');
	});
});

describe('log in', () => {
	beforeEach(async () => {
		const passwordHash = await bcrypt.hash('secret', 10);
		const user = new User({ username: 'user', passwordHash });
		await user.save();
	});

	test('log in succeeds with correct user information', async () => {
		await api
			.post('/api/login')
			.send({ username: 'user', password: 'secret' })
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('log in fails with incorrect user information', async () => {
		const newUser = {
			username: 'newuser',
			password: 'fakeuser',
		};

		const result = await api
			.post('/api/login')
			.send(newUser)
			.expect(401)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('Username does not match to any user.');
	});
});
