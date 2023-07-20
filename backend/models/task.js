const mongoose = require('mongoose');

const date = new Date().toLocaleString('en-US', process.env.DATE_OPTIONS);

const schema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	deadline: {
		type: Date,
		min: date,
	},
	notes: [String],
	quantity: Number,
	priority: {
		type: Number,
		default: 0,
	},
	completed: {
		type: Number,
		default: 0,
	},
	usedTime: {
		type: Number,
		default: 0,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	done: {
		type: Boolean,
		default: false,
	},
});

schema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Task', schema);
