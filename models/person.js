require('dotenv').config()
const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
	name: {type: String, minLength: 3, unique: true, required: true},
	number: {type: String, minLength: 8, validate: /(^\d{2,3}-\d{5,})|^\d{8,}/, required: true}
})

  
personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)