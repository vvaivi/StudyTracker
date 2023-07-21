const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const api = supertest(app);

const Task = require('../models/task');
const User = require('../models/user');
const { initialUsers, initialTasks, tasksInDb } = require('./test_helper');

let authHeader;

afterAll(async () => {
	await mongoose.disconnect();
});

describe('when there are tasks saved', () => {
	beforeAll(async () => {
		await User.deleteMany({});
		await Task.deleteMany({});

		const user = initialUsers[0];
		await api.post('/api/users').send(user);

		const response = await api.post('/api/login').send(user);
		authHeader = `Bearer ${response.body.token}`;

		const tasksWithUser = initialTasks.map((task) => ({ ...task, user: response.body.id }));

		await Task.insertMany(tasksWithUser);
	});

	test('tasks are returned as json', async () => {
		jest.setTimeout(10000);
		const response = await api
			.get('/api/tasks')
			.expect(200)
			.set('Authorization', authHeader)
			.expect('Content-Type', /application\/json/);

		expect(response.body).toHaveLength(initialTasks.length);
	});

	test('a task has field id', async () => {
		const response = await api
			.get('/api/tasks')
			.set('Authorization', authHeader)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		const task = response.body[0];

		expect(task.id).toBeDefined();
	});

	test('a task can be edited', async () => {
		const [taskBefore] = await tasksInDb();
		const modifiedTask = { ...taskBefore, title: 'make breakfast' };

		await api.put(`/api/tasks/${taskBefore.id}`).set('Authorization', authHeader).send(modifiedTask).expect(200);

		const tasks = await tasksInDb();
		const titles = tasks.map((t) => t.title);

		expect(titles).toContain(modifiedTask.title);
	});
});

describe('a new task', () => {
	test('can be added', async () => {
		const task = {
			title: 'Go to market',
		};

		await api
			.post('/api/tasks')
			.set('Authorization', authHeader)
			.send(task)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const tasks = await tasksInDb();
		expect(tasks).toHaveLength(initialTasks.length + 1);

		const titles = tasks.map((t) => t.title);
		expect(titles).toContain(task.title);
	});

	test('has priority, completed and time used variables initialized to 0 if initial value is not given', async () => {
		const task = {
			title: 'Eat pizza',
		};

		const response = await api
			.post('/api/tasks')
			.set('Authorization', authHeader)
			.send(task)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		expect(response.body.priority).toBe(0);
		expect(response.body.completed).toBe(0);
		expect(response.body.usedTime).toBe(0);
	});

	test('deadline date cannot be in the past', async () => {
		try {
			const task = new Task({
				title: 'Eat sushi',
				deadline: new Date().setDate(new Date().getDate() - 5),
			});
			await task.validate();
		} catch (error) {
			expect(error).not.toBeNull();
		}
	});

	test('cannot be created without a title', async () => {
		try {
			const task = new Task({
				priority: 1,
			});
			await task.validate();
		} catch (error) {
			expect(error).not.toBeNull();
		}
	});
});

describe('deleting a task', () => {
	let id;

	beforeEach(async () => {
		await Task.deleteMany({});

		const task = initialTasks[0];
		const response = await api.post('/api/tasks').set('Authorization', authHeader).send(task);

		id = response.body.id;
	});

	test('works if done by the creator', async () => {
		await api.delete(`/api/tasks/${id}`).set('Authorization', authHeader).expect(204);

		const tasksAfter = await tasksInDb();

		expect(tasksAfter).toHaveLength(0);
	});

	test('does not work without valid auth header', async () => {
		await api.delete(`/api/tasks/${id}`).expect(401);

		const tasksAfter = await tasksInDb();

		expect(tasksAfter).toHaveLength(1);
	});
});
