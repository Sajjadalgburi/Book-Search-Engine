// Import required modules
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

// Import GraphQL schema and database configuration
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// Set the port for the server to run on
const PORT = process.env.PORT || 3001;

// Create an Express application
const app = express();

const { typeDefs, resolvers } = require('./schemas');

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Function to start the Apollo Server
const startApolloServer = async () => {
  // Start the Apollo Server
  await server.start();

  // Middleware to parse JSON and URL-encoded bodies
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Mount Apollo middleware at the /graphql endpoint
  app.use('/graphql', expressMiddleware(server));

  // Serve client/dist directory as static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    // Route all other requests to the client's index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Once database connection is open, start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the function to start the Apollo Server
startApolloServer();
