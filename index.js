const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path'); 

// Define el esquema de GraphQL
const typeDefs = gql`
  type Query {
    aboutJuanda(message: String!): String
  },
  type Query {
    hello(message: String!): String
  },
  type Query {
    aboutPaul(message: String!): String
  },
  type Query {
    aboutNicol(message: String!): String
  },
  type Query {
    aboutSebastian(message: String!): String
  },
  type Query {
    aboutDaniel(message: String!): String
  },
  type Query {
    aboutNatalia(message: String!): String
  },
  type Query {
    aboutJuan(message: String!): String
  }
`;

// Define los resolvers de GraphQL
const resolvers = {
  Query: {
    hello: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte del profe `;
    },
    aboutJuanda: () => {
      return 'I like to play soccer. More play soccer than watch it'
    },
    aboutPaul: () => {
      return 'I love docker'
    },
    aboutNicol: () => {
      return 'I love soap operas, I am crazy about them'
    },
    aboutSebastian: () => {
      return 'I don`t know what to do with my life, whether to be a video game developer or 3D designer'
    },
    aboutDaniel: () => {
      return 'Im a Hamburger lover'
    },
    aboutNatalia: () => {
      return "I love sandwiches"
    },
    aboutJuan: () => {
      return "I love animals and nature, and also playing basketball"
    },
    
  },
};

async function startApolloServer() {
  // Crea la instancia de Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });

  // Inicia el servidor Apollo
  await server.start();

  // Crea la aplicación Express
  const app = express();

  // Aplica el middleware de Apollo Server a la aplicación Express
  server.applyMiddleware({ app, path: '/graphql' });

  // Sirve la aplicación de React desde la carpeta "saludofront-app"
   const reactAppPath = path.join(__dirname, 'saludofront-app', 'dist');
    app.use(express.static(reactAppPath));
    app.get('*', (req, res) => {
    res.sendFile(path.join(reactAppPath, 'index.html'));
    });

  // Inicia el servidor
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL ejecutándose en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();

