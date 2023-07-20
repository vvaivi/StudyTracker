const router = require('express').Router();
const Task = require('../models/task');

const { userExtractor } = require('../utils/middleware');

router.get('/', userExtractor, async (request, response) => {
	const tasks = await Task.find({ user: request.user.id }).populate('user', { username: 1, name: 1 });

	response.json(tasks);
});

router.post('/', userExtractor, async (request, response) => {
	const { title, deadline, notes, quantity, priority, completed, usedTime, done } = request.body;

	const user = request.user;
	if (!user) {
		return response.status(401).json({ error: 'Operation not permitted.' });
	}

	const task = new Task({
		title,
		deadline,
		notes,
		quantity,
		priority,
		completed,
		usedTime,
		done,
	});
	task.user = user.id;

	const createdTask = await task.save();

	user.tasks = user.tasks.concat(createdTask.id);
	await user.save();

	const newTask = await Task.findById(createdTask.id).populate('user', { username: 1, name: 1 });

	response.status(201).json(newTask);
});

router.put('/:id', userExtractor, async (request, response) => {
	const { title, deadline, notes, quantity, priority, completed, usedTime, done } = request.body;

	const user = request.user;
	if (!user) {
		return response.status(401).json({ error: 'Operation not permitted.' });
	}

	const taskToUpdate = await Task.findByIdAndUpdate(
		request.params.id,
		{
			title,
			deadline,
			notes,
			quantity,
			priority,
			completed,
			usedTime,
			done,
			category: category.id,
		},
		{ new: true }
	);

	const updatedTask = await Task.findById(taskToUpdate.id).populate('user', { username: 1, name: 1 });

	response.json(updatedTask);
});

router.get('/:id', async (request, response) => {
	const task = await Task.findById(request.params.id).populate('user', { username: 1, name: 1 });

	response.json(task);
});

router.delete('/:id', userExtractor, async (request, response) => {
	const task = await Task.findById(request.params.id);

	const user = request.user;
	if (!user || task.user.toString() !== user.id.toString()) {
		return response.status(401).json({ error: 'Operation not permitted.' });
	}

	user.tasks = user.tasks.filter((t) => t.toString() !== task.id.toString());

	await user.save();
	await task.remove();

	response.status(204).end();
});

module.exports = router;
