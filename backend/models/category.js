const mongoose = require('mongoose');

const schema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
	target: Number,
	selected: {
		type: Boolean,
		default: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Task',
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

module.exports = mongoose.model('Category', schema);
