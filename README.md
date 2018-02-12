# Objection-GraphQL Postgres issue

I've created this repo to help investigate a potential bug.

### The issue

I'm using objection.js with knex, pg and objection-graphql, and express.

My GraphQL query should return multiple records for a query, but is returning just one record in the query result.

What's more, the logs in PostGres show that the SQL query made to the database should return multiple records.

I could be doing something daft, but I wanted to check with someone.

### Setup instructions

```
git clone git@github.com:paulbjensen/objection-graphql-postgres-issue.git
cd objection-graphql-postgres-issue
npm i
```

Check the config.js file to ensure that you have the config parameters for connecting to Postgres.

Once you are happy with the configuration, and Postgres is running, execute these commands:

```
npm run createDatabase
npm run migrate
```

Also do the same for the test suite:

```
NODE_ENV=test npm run createDatabase
NODE_ENV=test npm run migrate
```

### Running the test

```
npm test
```

If you have a look at the test/makeGraphqlQuery,js file, you will see how it runs.

* We have a Category model
* We clear the categories table, and then insert 2 category record (Food, Clothing)
* We then make a graphql query on the categories schema, and scope the name field
* We expected to get back an array of 2 objects, each with a name property
* Instead, we get back a single object with the name "Food".

This is the bug - returning only one record instead of two, as well as returning it as an object rather than inside of an array

### License

MIT. See LICENSE
