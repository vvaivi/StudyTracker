const router = require('express').Router();
const Category = require('../models/category');

const { userExtractor } = require('../utils/middleware');

router.get('/', userExtractor, async (request, response) => {
	const category = await Category.find({ user: request.user.id }).populate('user', { username: 1, name: 1 });

	response.json(category);
});

router.post('/', userExtractor, async (request, response) => {
	const { name, tasks } = request.body;

	const category = new Category({ name, tasks });

	const user = request.user;

	if (!user) {
		return response.status(401).json({ error: 'Operation not permitted.' });
	}

	category.user = user.id;
	const createdCategory = await category.save();

	user.categories = user.categories.concat(createdCategory.id);
	await user.save();

	tasks.forEach(async (t) => {
		t.category = createdCategory.id;
		await t.save();
	});

	const newCategory = await Category.findById(createdCategory.id).populate('user', { username: 1, name: 1 });

	response.status(201).json(newCategory);
});

router.put('/:id', async (request, response) => {
	const { name, dateCreated, target, selected, tasks } = request.body;

	const categoryToUpdate = await Category.findByIdAndUpdate(
		request.params.id,
		{ name, dateCreated, target, selected, tasks },
		{ new: true }
	);

	const updatedCategory = await Category.findById(categoryToUpdate.id).populate('user', { username: 1, name: 1 });

	response.json(updatedCategory);
});

router.get('/:id', async (request, response) => {
	const category = await Category.findById(request.params.id).populate('user', { username: 1, name: 1 });

	response.json(category);
});

module.exports = router;
