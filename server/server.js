const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('./src/schema');
const resolvers = require('./resolvers');

const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.listen(4000, () => console.log('Server running on http://localhost:4000/graphql'));
}

startServer();

