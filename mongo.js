/* global process */

const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>')
	process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

console.log(name, number, password)

const url = `mongodb+srv://fullstack:${password}@cluster0.uxqnrnd.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose
	.connect(url)
	.then(() => {
		console.log('connected')
		
		if(name && number){
			const person = new Person({
				name: name,
				number: number
			})

			person.save().then(() => {
				console.log(`Added ${name}'s number ${number} to phonebook`)
				mongoose.connection.close()
			})

		} else {
			Person.find({}).then(result => {
				console.log('phonebook')
				result.forEach(person => {
					console.log(person.name, person.number)
				})
				console.log('People retrieved')
			}).then(() => {
				mongoose.connection.close()
			})
		}
	}).catch((err) => console.log(err))

