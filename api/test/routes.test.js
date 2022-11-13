const expect = require('chai').expect
const request = require('supertest')
const baseUrl = 'localhost:5050'
require('../src/app')

describe('GET: Get all recipes', () => {
	it('Should get the first 100 recipes', (done) => {
		request(baseUrl)
			.get('/api/recipes/all')
			.end((err, res) => {
				expect(res.statusCode).to.be.equal(200)
				expect(JSON.parse(res.text).length).to.be.equal(100)
				done()
			})
	})

	it('Should get the recipes 201 - 300', (done) => {
		request(baseUrl)
			.get('/api/recipes/all?offset=200')
			.end((err, res) => {
				const data = JSON.parse(res.text)
				expect(res.statusCode).to.be.equal(200)
				expect(data.length).to.be.equal(100)
				expect(data[0].id).to.be.greaterThanOrEqual(201)
				done()
			})
	})
})

describe('GET: Get individual recipes', () => {
	it('Should return a recipe object', (done) => {
		request(baseUrl)
			.get(`/api/recipes/${Math.floor(Math.random() * 100) + 1}`)
			.end((err, res) => {
				const data = JSON.parse(res.text)
				expect(res.statusCode).to.be.equal(200)
				expect(typeof(data) === 'object')
				done()
			})
	})

	it('Should have a title, instructions, and ingredients list', (done) => {
		request(baseUrl)
			.get(`/api/recipes/${Math.floor(Math.random() * 100) + 1}`)
			.end((err, res) => {
				const data = JSON.parse(res.text)
				expect(data.title.length).to.be.greaterThan(0)
				expect(data.instructions.length).to.be.greaterThan(0)
				expect(data.ingredients.length).to.be.greaterThan(0)
				done()
			})
	})
})

describe('GET: Search recipes with the keyword "steak"', () => {

	it('Should return an array of recipes', (done) => {
		request(baseUrl)
			.get(`/api/recipes/search?term=steak`)
			.end((err, res) => {
				const data = JSON.parse(res.text)
				expect(res.statusCode).to.be.equal(200)
				expect(typeof(data) === 'array')
				done()
			})
	})

	it('Should have the term "steak" in all returned items', (done) => {
		request(baseUrl)
			.get(`/api/recipes/search?term=steak`)
			.end((err, res) => {
				const data = JSON.parse(res.text)
				expect(data.some(item => {
					return item.title.includes('steak') ||
						item.summary.includes('steak') ||
						item.instructions.includes('steak') ||
						Object.values(JSON.parse(item.ingredients)).some(ingredient => ingredient.includes('steak')) ||
						Object.values(JSON.parse(item.types)).some(type => type.includes('steak'))
				})).to.be.true
				done()
			})
	})
})