const mongoose = require('mongoose');

const schema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: String,
	passwordHash: String,
	verified: {
		type: Boolean,
		default: false,
	},
	guest: {
		type: Boolean,
		default: false,
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Task',
		},
	],
	categories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
		},
	],
});

schema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	},
});

const User = mongoose.model('User', schema);

module.exports = User;
