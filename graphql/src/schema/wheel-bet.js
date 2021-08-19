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
    const { data } = await axios.post(`http://wheel/get-seed`, { seedId });
    return data;
  });
});

exports.Type = new GraphQLObjectType({
  name: 'WheelBet',
  fields: () => ({
    id: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    payout: { type: GraphQLFloat },
    segment: { type: GraphQLInt },
    segmentMultiplier: { type: GraphQLFloat },
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
