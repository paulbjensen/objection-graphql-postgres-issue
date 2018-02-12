// Dependencies
const { port, allowedOrigins } = require('./config');
const knex = require('knex');
const express = require('express');
const graphql = require('graphql').graphql;
const graphQlBuilder = require('objection-graphql').builder;
const db = require('./db');
const Category = require('./models/Category');
const app = express();

const graphQlSchema = graphQlBuilder()
	.model(Category)
	.build();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', allowedOrigins);
	res.header('Access-Control-Allow-METHODS', 'GET,POST,DELETE');
	res.header(
		'Access-Control-Allow-Headers',
		'X-Requested-With,Content-Type,Authorization'
	);
	next();
});

app.get('/graphql', (req, res, next) => {
	graphql(graphQlSchema, req.query.query, {
		knex: db
	})
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			next(err);
		});
});

app.listen(port, () => {
	console.log('Server is listening on port', port);
});
