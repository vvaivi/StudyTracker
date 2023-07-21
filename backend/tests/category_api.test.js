const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const api = supertest(app);

const Category = require('../models/category');
const User = require('../models/user');
const { initialUsers, initialCategories, categoriesInDb } = require('./test_helper');

let authHeader;

afterAll(async () => {
	await mongoose.disconnect();
});

describe('when there are categories saved', () => {
	beforeAll(async () => {
		await User.deleteMany({});
		await Category.deleteMany({});

		const user = initialUsers[0];
		await api.post('/api/users').send(user);

		const response = await api.post('/api/login').send(user);
		authHeader = `Bearer ${response.body.token}`;

		const categoriesWithUser = initialCategories.map((category) => ({ ...category, user: response.body.id }));

		await Category.insertMany(categoriesWithUser);
	});

	test('categories are returned as json', async () => {
		const response = await api
			.get('/api/categories')
			.set('Authorization', authHeader)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(response.body).toHaveLength(initialCategories.length);
	});

	test('a category has field id', async () => {
		const response = await api
			.get('/api/categories')
			.set('Authorization', authHeader)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		const category = response.body[0];

		expect(category.id).toBeDefined();
	});

	test('a category can be edited', async () => {
		const [categoryBefore] = await categoriesInDb();
		const modifiedCategory = { ...categoryBefore, name: 'Updated Category' };

		await api
			.put(`/api/categories/${categoryBefore.id}`)
			.set('Authorization', authHeader)
			.send(modifiedCategory)
			.expect(200);

		const categories = await categoriesInDb();
		const categoryNames = categories.map((c) => c.name);

		expect(categoryNames).toContain('Updated Category');
	});
});

describe('a new category', () => {
	test('can be added', async () => {
		const category = {
			name: 'New Category',
			tasks: [],
		};

		await api
			.post('/api/categories')
			.set('Authorization', authHeader)
			.send(category)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const categories = await categoriesInDb();
		expect(categories).toHaveLength(initialCategories.length + 1);

		const categoryNames = categories.map((c) => c.name);
		expect(categoryNames).toContain(category.name);
	});

	test('is selected by default', async () => {
		const category = {
			name: 'New Category 1',
			tasks: [],
		};

		const response = await api
			.post('/api/categories')
			.set('Authorization', authHeader)
			.send(category)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		expect(response.body.selected).toBe(true);
	});

	test('does not have target value by default', async () => {
		const category = {
			name: 'New Category 2',
			tasks: [],
		};

		const response = await api
			.post('/api/categories')
			.set('Authorization', authHeader)
			.send(category)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		expect(response.body.target).not.toBeDefined();
	});

	test('has date of creation saved', async () => {
		const category = {
			name: 'New Category 3',
			tasks: [],
		};

		const response = await api
			.post('/api/categories')
			.set('Authorization', authHeader)
			.send(category)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		expect(response.body.dateCreated).toBeDefined();
	});
});
