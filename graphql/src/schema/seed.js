const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');

exports.Type = new GraphQLObjectType({
  name: 'Seed',
  fields: () => ({
    id: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    secret: { type: GraphQLString },
    hash: { type: GraphQLString },
    nonce: { type: GraphQLInt }
  })
});
