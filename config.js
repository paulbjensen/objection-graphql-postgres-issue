// Dependencies
const merge = require('deepmerge');
const os = require('os');

// Configuration
const app_db_namespace = 'objection_graphql_postgres_issue';

// Default settings for the environment
const defaults = {
	allowedOrigins: 'http://localhost:3000',
	db: {
		client: 'postgresql',
		connection: {
			host: '/var/run/postgresql', // Workaround for Ubuntu Linux
			user: 'postgres',
			database: `${app_db_namespace}_development`
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	},
	port: 3001
};

const platform = os.platform();

let host = defaults.db.connection.host;
if (process.env.CIRCLECI || platform === 'darwin') {
	host = '127.0.0.1';
}

const development = merge(defaults, { db: { connection: { host } } });

// Differences for the test env
const test = merge(defaults, {
	db: {
		connection: {
			host,
			database: `${app_db_namespace}_test`
		}
	}
});

const environments = { development, test };

// Export a specific environment here
const env = process.env.NODE_ENV || 'development';

module.exports = environments[env];
