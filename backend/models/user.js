const mongoose = require('mongoose');

const schema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: String,
	passwordHash: String,
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
