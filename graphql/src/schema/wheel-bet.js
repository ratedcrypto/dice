const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
} = require('graphql');
const User = require('./user');
const Seed = require('./seed');
const { wheelSeedLoader } = require('../dataloader');

exports.Type = new GraphQLObjectType({
  name: 'WheelBet',
  fields: () => ({
    id: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    payout: { type: GraphQLFloat },
    result: { type: GraphQLFloat },
    nonce: { type: GraphQLInt },
    user: {
      type: User.Type,
      resolve: ({ user }) => ({ name: user }),
    },
    seed: {
      type: Seed.Type,
      resolve: async ({ seed_id: seedId }) => {
        const data = await wheelSeedLoader.load(seedId);
        return data;
      },
    },
  }),
});
