const { Model } = require('objection');
const db = require('../db');

Model.knex(db);

class Category extends Model {
	static get tableName() {
		return 'categories';
	}

	$beforeInsert() {
		const date = new Date().toISOString();
		this.created_at = date;
		this.updated_at = date;
	}

	$beforeUpdate() {
		this.updated_at = new Date().toISOString();
	}

	static get jsonSchema() {
		return {
			type: 'object',
			properties: {
				id: { type: 'integer', readOnly: true },
				is_all: { type: 'boolean' },
				name: { type: 'string' },
				created_at: { type: 'string', format: 'date-time', readOnly: true },
				updated_at: { type: 'string', format: 'date-time' }
			}
		};
	}
}

module.exports = Category;
