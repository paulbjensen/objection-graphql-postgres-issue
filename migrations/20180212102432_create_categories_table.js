exports.up = knex => {
	// Create the categories table
	return knex.schema.createTableIfNotExists('categories', table => {
		table.increments('id').primary();
		table.boolean('is_all').defaultTo(false);
		table.string('name');
		table.timestamps(true, true);
		table.unique(['name']);
	});
};

exports.down = knex => {
	// Destroy the categories table
	return knex.schema.dropTableIfExists('categories');
};
