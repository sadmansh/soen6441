const fs = require('fs')
const json = fs.readFileSync('store.json')
const store = JSON.parse(json)

class Controller {
	
	/* Get all of whatever we are working with */
	async getAll() {
		return new Promise((resolve, _) => {
			resolve(store)
		})
	}

	/* Get individual items of whatever we are working with */
	async get(id) {
		return new Promise((resolve, reject) => {
			const item = store.find(i => i.id === parseInt(id))
			if (item) {
				resolve(item)
			} else {
				reject(`Item with id ${id} not found.`)
			}
		})
	}

	/* Create whatever we are working with */
	async create(data) {
		return new Promise((resolve, _) => {
			const item = {
				id: store.length + 1,
				...data
			}
			store.push(item)
			fs.writeFileSync('store.json', JSON.stringify(store))
			resolve(data)
		})
	}

	/* Update whatever we are working with */
	async update(item) {
		
	}

	/* Delete whatever we are working with */
	async delete(id) {
		return 
	}
}

module.exports = Controller