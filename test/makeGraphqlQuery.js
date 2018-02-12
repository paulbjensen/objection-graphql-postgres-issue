// Dependencies
const assert = require('assert');
const Category = require('../models/Category');
const app = require('../index');
const graphql = require('graphql').graphql;
const graphQlBuilder = require('objection-graphql').builder;
const graphQlSchema = graphQlBuilder()
	.model(Category)
	.build();

describe('The check', () => {
	beforeEach(async () => {
		await Category.query().delete();
		await Category.query().insert({ name: 'Food' });
		await Category.query().insert({ name: 'Clothing' });
	});

	it('should return a set of names for the category records in the database', async () => {
		// Execute a GraphQL query.
		await graphql(
			graphQlSchema,
			`
				{
					categories {
						name
					}
				}
			`
		).then(result => {
			console.log(result);
			const { categories } = result.data;
			assert.equal(categories.length, 2);
			assert.equal(categories[0].name, 'Food');
			assert.equal(categories[1].name, 'Clothing');
		});
	});
});
