/* eslint-disable no-console */
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
} = require('graphql');
const User = require('./user');
const Seed = require('./seed');
const { diceSeedLoader } = require('../dataloader');

exports.Type = new GraphQLObjectType({
  name: 'DiceBet',
  fields: () => ({
    id: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    payout: { type: GraphQLFloat },
    target: { type: GraphQLInt },
    result: { type: GraphQLInt },
    nonce: { type: GraphQLInt },
    user: {
      type: User.Type,
      resolve: ({ user }) => ({ name: user }),
    },
    seed: {
      type: Seed.Type,
      resolve: async ({ seed_id: seedId }) => {
        const data = await diceSeedLoader.load(seedId);
        return data;
      },
    },
  }),
});
