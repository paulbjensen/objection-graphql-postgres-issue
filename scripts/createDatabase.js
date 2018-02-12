const { Client } = require('pg');
const { db } = require('../config');
const client = new Client();

const main = async () => {
	await client.connect();
	await client.query(`CREATE DATABASE ${db.connection.database}`);
	await client.end();
};

try {
	main();
} catch (err) {
	throw err;
}
