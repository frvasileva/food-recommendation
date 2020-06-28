import fs from "fs";
import path from "path";
import neo4j from "neo4j-driver";
import { neo4jgraphql, makeAugmentedSchema } from "neo4j-graphql-js";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import "dotenv/config";

// console.log({ bcrypt })

/*
 * Create an executable GraphQL schema object from GraphQL type definitions
 * including autogenerated queries and mutations.
 * Optionally a config object can be included to specify which types to include
 * in generated queries and/or mutations. Read more in the docs:
 * https://grandstack.io/docs/neo4j-graphql-js-api.html#makeaugmentedschemaoptions-graphqlschema
 */
const schemaFilePath = path.join(__dirname, "../src/schema.graphql");
const schema = makeAugmentedSchema({
	typeDefs: fs.readFileSync(schemaFilePath).toString("utf-8"),
	config: {
		auth: {
			isAuthenticated: true,
			hasRole: true,
		},
	},
	resolvers: {
		Mutation: {
			// Hash the password, insert a user via cypher and return a JWT
			registerUser: async (
				object: any,
				params: any,
				ctx: any,
				resolveInfo: any
			) => {
				// params.input.password = bcrypt.hashSync(params.input.password, 10);

				await neo4jgraphql(object, params, ctx, resolveInfo);
				return jwt.sign(
					{
						exp: Math.floor(Date.now() / 1000) + 60 * 6000,
						userId: params.input.id,
						email: params.input.email,
						friendlyUrl: params.input.friendlyUrl,
					},
					process.env.JWT_SECRET
				);
			},

			// Find the user by email via cypher and if passwords match return a JWT
			loginUser: async (
				object: any,
				params: any,
				ctx: any,
				resolveInfo: any
			) => {
				const result = await neo4jgraphql(object, params, ctx, resolveInfo);
				if (result === null) {
					return "-1";
				} else {
					const passwordIsCorrect =
						params.password === result.properties.password;

					if (!passwordIsCorrect) throw new Error("Invalid credentials");
					return jwt.sign(
						{
							exp: Math.floor(Date.now() / 1000) + 60 * 6000,
							userId: result.properties.id,
							email: result.properties.email,
							friendlyUrl: result.properties.friendlyUrl,
						},
						process.env.JWT_SECRET
					);
				}
			},
			loginFacebookUser: async (
				object: any,
				params: any,
				ctx: any,
				resolveInfo: any
			) => {
				await neo4jgraphql(object, params, ctx, resolveInfo);

				var token = jwt.sign(
					{
						exp: Math.floor(Date.now() / 1000) + 60 * 6000,
						userId: params.input.id,
						email: params.input.email,
						friendlyUrl: params.input.friendlyUrl,
					},
					process.env.JWT_SECRET
				);
				console.log("token", token);
				return token;
			},
		},
	},
});

/*
 * Create a Neo4j driver instance to connect to the database
 * using credentials specified as environment variables
 * with fallback to defaults
 */

const driver = neo4j.driver(
	process.env.GRAPHENEDB_BOLT_URL,
	neo4j.auth.basic(
		process.env.GRAPHENEDB_BOLT_USER,
		process.env.GRAPHENEDB_BOLT_PASSWORD
	),
	{ encrypted: process.env.NEO4J_CONN_ENCRYPTION as any }
);

// const driver = neo4j.driver(
// 	graphenedbURL,
// 	neo4j.auth.basic(graphenedbUser, graphenedbPass),
// 	{ encrypted: "ENCRYPTION_ON" }
// );

/*
 * Create a new ApolloServer instance, serving the GraphQL schema
 * created using makeAugmentedSchema above and injecting the Neo4j driver
 * instance into the context object so it is available in the
 * generated resolvers to connect to the database.
 */
const server = new ApolloServer({
	context: ({ req }) => {
		const bearerHeader = req.headers.authorization || "";
		const bearerToken = bearerHeader.split(" ")[1];
		const tokenPayload = bearerToken
			? (jwt.verify(bearerToken, process.env.JWT_SECRET) as any)
			: {};

		return {
			driver,
			req,
			cypherParams: {
				currentUserId: tokenPayload.userId,
			},
		};
	},
	schema,
});

const app = express();
server.applyMiddleware({ app, path: "/api" });

app.use(express.static(path.join(__dirname, "../ui/build")));
app.use("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../ui/build", "index.html"));
});

app.listen(process.env.PORT || 4000);
console.log(`GraphQL API ready`);
