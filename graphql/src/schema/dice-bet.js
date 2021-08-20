const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
} = require('graphql');
const DataLoader = require('dataloader');

const axios = require('axios');
const User = require('./user');
const Seed = require('./seed');

const seedLoader = new DataLoader(async (seed_ids) => {
  return seed_ids.map(async seedId => {
    const { data } = await axios.post(`http://dice/get-seed`, { seedId });
    return data;
  });
});

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
      resolve: async ({ seed_id }) => {
        const data = await seedLoader.load(seed_id);
        return data;
      },
    },
  }),
});
