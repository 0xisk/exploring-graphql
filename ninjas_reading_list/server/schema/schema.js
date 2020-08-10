const graphql = require('graphql');
const _ = require('lodash');

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLID,
  GraphQLInt
} = graphql;

// Dummmy Data
let books = [
  {id: '1', name: 'Name of the Wind', genre: 'Fantasy', authorId: '1'},
  {id: '2', name: 'The Final Empire', genre: 'Fantasy', authorId: '2'},
  {id: '3', name: 'The Long Earth', genre: 'Sci-Fic', authorId: '3'}
]

// Dummmy Data
let authors = [
  {id:'1', name: 'Patric Rothfuss', age:44},
  {id:'2', name: 'Brandon Sanderson', age:42},
  {id:'3', name: 'Terry Pratchett', age:66},
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        console.log(parent);
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } }, 
      resolve(parent, args) {
        // code to get data from DB / other source
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  } 
});

module.exports = new GraphQLSchema({
  query: RootQuery
});