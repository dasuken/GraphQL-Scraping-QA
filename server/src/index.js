const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const scrape = require('./script')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type TriviaQuestion {
    questionImg: String
    answerImg: String
    questionText: String
    options: [String]
    answer: String
    answerDescription: String
  }

  type Query {
    questions: [TriviaQuestion]
  }
`;

// Provide resolver functions for your schema fields
let questions = ''
const resolvers = {
  Query: {
    questions: async () => {
      if (questions) {
        return questions
      }
      questions = await scrape()
      return questions
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);