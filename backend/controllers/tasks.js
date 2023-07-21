const router = require('express').Router();
const Task = require('../models/task');
const Category = require('../models/category');

const { userExtractor } = require('../utils/middleware');

router.get('/', userExtractor, async (request, response) => {
	const tasks = await Task.find({ user: request.user.id })
		.populate('category', { name: 1 })
		.populate('user', { username: 1, name: 1 });

	response.json(tasks);
});

router.post('/', userExtractor, async (request, response) => {
	const { title, deadline, notes, quantity, priority, completed, usedTime, done, categoryName } = request.body;

	const user = request.user;
	if (!user) {
		return response.status(401).json({ error: 'Operation not permitted.' });
	}

	let category, existingCategory;
	if (categoryName) {
		const categories = await Category.find({ user: user.id });
		existingCategory = categories.find((c) => c.name === categoryName);
		category = existingCategory ? existingCategory : new Category({ name: categoryName });
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
		category: categoryName ? category.id : null,
	});
	task.user = user.id;

	const createdTask = await task.save();
	user.tasks.push(createdTask.id);

	if (!existingCategory && categoryName) {
		user.categories.push(category.id);
	}
	await user.save();

	if (categoryName) {
		category.user = user.id;
		category.tasks.push(createdTask.id);
		await category.save();
	}

	const newTask = await Task.findById(createdTask.id)
		.populate('category', { name: 1 })
		.populate('user', { username: 1, name: 1 });

	response.status(201).json(newTask);
});

router.put('/:id', userExtractor, async (request, response) => {
	const { title, deadline, notes, quantity, priority, completed, usedTime, done, categoryName } = request.body;

	const user = request.user;
	if (!user) {
		return response.status(401).json({ error: 'Operation not permitted.' });
	}

	let category, existingCategory;
	if (categoryName) {
		const categories = await Category.find({ user: user.id });
		existingCategory = categories.find((c) => c.name === categoryName);
	}

	const task = await Task.findById(request.params.id);
	const oldCategory = await Category.findById(task.category);

	if (oldCategory) {
		if (oldCategory.name !== categoryName) {
			if (oldCategory.tasks.filter((t) => t.toString() !== task.id).length === 0) {
				user.categories = user.categories.filter((c) => c.toString() !== oldCategory.id);
				await oldCategory.remove();
			} else {
				oldCategory.tasks = oldCategory.tasks.filter((t) => t.toString() !== task.id);
				await oldCategory.save();
			}
		}
	}

	if (categoryName) {
		if (existingCategory) {
			category = existingCategory;
			if (existingCategory.name !== categoryName) {
				category.tasks.push(request.params.id);
				await category.save();
			}
		} else {
			category = new Category({ name: categoryName });
			category.tasks = [request.params.id];
			category.user = user.id;

			user.categories.push(category.id);

			await user.save();
			await category.save();
		}
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
			category: categoryName ? category.id : null,
		},
		{ new: true }
	);

	const updatedTask = await Task.findById(taskToUpdate.id)
		.populate('category', { name: 1 })
		.populate('user', { username: 1, name: 1 });

	response.json(updatedTask);
});

router.get('/:id', async (request, response) => {
	const task = await Task.findById(request.params.id)
		.populate('category', { name: 1 })
		.populate('user', { username: 1, name: 1 });

	response.json(task);
});

router.delete('/:id', userExtractor, async (request, response) => {
	const task = await Task.findById(request.params.id);

	const user = request.user;
	if (!user || task.user.toString() !== user.id.toString()) {
		return response.status(401).json({ error: 'Operation not permitted.' });
	}
	user.tasks = user.tasks.filter((t) => t.toString() !== task.id.toString());

	if (task.category) {
		const category = await Category.findById(task.category);

		// Remove categories that no longer have tasks
		if (category.tasks.filter((t) => t.toString() !== task.id).length === 0) {
			user.categories = user.categories.filter((c) => c.toString() !== category.id.toString());
			await category.remove();
		} else {
			category.tasks = category.tasks.filter((t) => t.toString() !== task.id.toString());
			await category.save();
		}
	}

	await user.save();
	await task.remove();

	response.status(204).end();
});

module.exports = router;
