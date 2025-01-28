const Author = require('../models/author');
const User = require('../models/user');
const Post = require('../models/post');

// RELATIONSHIP: Option A
// Author.belongsTo(User, { foreignKey: 'userId', as: 'user' });
// Author.hasMany(Post, { foreignKey: 'postId', as: 'posts' });
// Post.belongsTo(Author, { foreignKey: 'authorId', as: 'author' });
// User.hasOne(Author, { foreignKey: 'userId', as: 'author' });

// RELATIONSHIP: Option B
// Initialize models
const models = {
  User,
  Author,
  Post,
};
// Define associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  } 
});

const resolvers = {
  Query: {
    async getUser(parent, { id }) {
      try {
        const user = await User.findByPk(id);
        return user;
      } catch (error) {
        throw new Error('Error fetching user');
      }
    },
    async getAllUsers() {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        console.log(error)
        throw new Error('Error fetching all users');
      }
    },

    //-- POST
    async getPost(parent, { id }) {
      try {
        const post = await Post.findByPk(id);
        return post;
      } catch (error) {
        throw new Error('Error fetching post');
      }
    },
    async getAllPosts() {
      try {
        const post = await Post.findAll();
        return post;
      } catch (error) {
        console.log(error)
        throw new Error('Error fetching all posts');
        
      }
    },
    async getPostsByAuthor(parent, {authorId}) {
      try {
        const post = await Post.findAll({
          where: { authorId },
          include: { model: Author, as: 'author'},
        });
        return post;
      } catch (error) {
        console.log(error)
        throw new Error('Error fetching all posts');
        
      }
    },
    // Author
    async getAllAuthor() {
      try {
        const authors = await Author.findAll({
          include: { model: User, as: 'user' }, // Include user data when fetching authors
        });
        return authors;
      } catch (error) {
        console.log(error)
        throw new Error('Error fetching all authors');
        
      }
    },
    async getAuthorByUser(parent, { userId }) {
      try {
        const author = await Author.findOne({
          where: { userId },
          include: { model: User, as: 'user' }, // Include user data when fetching the author
        });
        return author;
      } catch (error) {
        throw new Error('Error fetching author');
      }
    },
  },
  Mutation: {
    async createUser(parent, { firstName, lastName }) {
      try {
        const user = await User.create({ firstName, lastName });
        return user;
      } catch (error) {
        throw new Error('Error creating user');
      }
    },
    async updateUser(parent, { id, firstName, lastName }) {
      try {
        const user = await User.findByPk(id);
        if (!user) {
          throw new Error('User not found');
        }
        user.firstName = firstName;
        user.lastName = lastName;
        await user.save();
        return user;
      } catch (error) {
        throw new Error('Error updating user');
      }
    },
    async deleteUser(parent, { id }) {
      try {
        const user = await User.findByPk(id);
        if (!user) {
          throw new Error('User not found');
        }
        await user.destroy();
        return user;
      } catch (error) {
        throw new Error('Error deleting user');
      }
    },
    // Author
    async createAuthor(parent, { name, userId }) {
      try {
        // Check if the user already has an author associated with them
        const existingAuthor = await Author.findOne({ where: { userId } });
        if (existingAuthor) {
          throw new Error('This user already has an author.');
        }

        const author = await Author.create({ name, userId });
        return author;
      } catch (error) {
        throw new Error('Error creating author');
      }
    },
    async updateAuthor(parent, { id, name, userId }) {
      try {
        const author = await Author.findByPk(id);
        if (!author) {
          throw new Error('Author not found');
        }
        author.name = name;
        author.userId = userId;
        await author.save();
        return author;
      } catch (error) {
        throw new Error('Error updating author');
      }
    },
    async deleteAuthor(parent, { id }) {
      try {
        const author = await Author.findByPk(id);
        if (!author) {
          throw new Error('User not found');
        }
        await author.destroy();
        return author;
      } catch (error) {
        throw new Error('Error deleting author');
      }
    },

    // --- POST
    async createPost(parent, { title, content, authorId }) {
      try {
        const post = await Post.create({ title, content, authorId });
        return post;
      } catch (error) {
        throw new Error('Error creating post');
      }
    },
    async updatePost(parent, { id, title, content }) {
      try {
        const post = await Post.findByPk(id);
        if (!post) {
          throw new Error('Post not found');
        }
        post.title = title;
        post.content = content;
        await post.save();
        return post;
      } catch (error) {
        throw new Error('Error updating post');
      }
    },
    async deletePost(parent, { id }) {
      try {
        const post = await Post.findByPk(id);
        if (!post) {
          throw new Error('Post not found');
        }
        await post.destroy();
        return post;
      } catch (error) {
        throw new Error('Error deleting post');
      }
    },
  },  
  // Relationships
  Author: {
    user: async (author) => {
      // This resolves the 'user' field in the Author type
      return await User.findByPk(author.userId);
    },
    posts: async (author) => {
      // This resolves the 'posts' field in the Author type
      return await Post.findAll({ where: { authorId: author.id } });
    },
  },
  User: {
    author: async (user) => {
      // This resolves the 'author' field in the User type
      return await Author.findOne({ where: { userId: user.id } });
    },
  },
  Post: {
    author: async (post) => {
      // This resolves the 'author' field in the User type
      return await Author.findByPk(post.authorId);
    },
  },
  
};

module.exports = resolvers;
