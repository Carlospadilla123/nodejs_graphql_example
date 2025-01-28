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
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String
    content: String
    author: Author
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
    getAuthor(id: ID!): Author
    getAuthorByUser(userId: ID!): Author
    getAllAuthor: [Author]
    getPost(id: ID!): Post
    getAllPosts: [Post]
    getPostsByAuthor(authorId: ID!): [Post]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!): User
    updateUser(id: ID!, firstName: String!, lastName: String!): User
    deleteUser(id: ID!): User

    createAuthor(name: String!, userId: String!): Author
    updateAuthor(id: ID!, name: String!, userId: String!): Author
    deleteAuthor(id: ID!): Author

    createPost(title: String!, content: String!, authorId: ID!): Post
    updatePost(id: ID!, title: String, content: String, authorId: ID!): Post
    deletePost(id: ID!): Post
  }
`;

module.exports = typeDefs;
