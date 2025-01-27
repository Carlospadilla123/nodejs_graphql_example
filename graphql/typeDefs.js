const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    author: Author
  }

  type Author {
    id: ID!
    name: String!
    user: User
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
    getAuthor(id: ID!): Author
    getAuthorByUser(userId: ID!): Author
    getAllAuthor: [Author]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!): User
    updateUser(id: ID!, firstName: String!, lastName: String!): User
    deleteUser(id: ID!): User

    createAuthor(name: String!, userId: String!): Author
    updateAuthor(id: ID!, name: String!, userId: String!): Author
    deleteAuthor(id: ID!): Author
  }
`;

module.exports = typeDefs;
