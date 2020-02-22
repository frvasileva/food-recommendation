import fs from "fs";
import path from "path";
import { ApolloServer } from "apollo-server";
import neo4j from "neo4j-driver";
import { makeAugmentedSchema } from "neo4j-graphql-js";

/*
* Create an executable GraphQL schema object from GraphQL type definitions
* including autogenerated queries and mutations.
* Optionally a config object can be included to specify which types to include
* in generated queries and/or mutations. Read more in the docs:
* https://grandstack.io/docs/neo4j-graphql-js-api.html#makeaugmentedschemaoptions-graphqlschema
*/
const schemaFilePath = path.join(__dirname, "schema.graphql");
const schema = makeAugmentedSchema({
	typeDefs: fs.readFileSync(schemaFilePath).toString("utf-8")
});

/*
 * Create a Neo4j driver instance to connect to the database
 * using credentials specified as environment variables
 * with fallback to defaults
 */
const driver = neo4j.driver(
	"bolt://localhost:7687",
	neo4j.auth.basic("neo4j", "parola")
);

/*
 * Create a new ApolloServer instance, serving the GraphQL schema
 * created using makeAugmentedSchema above and injecting the Neo4j driver
 * instance into the context object so it is available in the
 * generated resolvers to connect to the database.
 */
const server = new ApolloServer({
	context: { driver },
	schema
});

server.listen(4000).then(({ url }) => {
	console.log(`GraphQL API ready at ${url}`);
});
