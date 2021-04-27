const DataLoader = require('dataloader');
const axios = require('axios');

async function diceSeedBatchLoader(seedIds) {
  const results = await axios.post(`http://dice/get-seeds`, { seedIds });
  return seedIds.map(
    (key) =>
      results.data.find((data) => data.id === key) ||
      new Error(`No result for ${key}`)
  );
}

async function wheelSeedBatchLoader(seedIds) {
  const results = await axios.post(`http://wheel/get-seeds`, { seedIds });
  return seedIds.map(
    (key) =>
      results.data.find((data) => data.id === key) ||
      new Error(`No result for ${key}`)
  );
}

exports.diceSeedLoader = new DataLoader(diceSeedBatchLoader, { cache: false });
exports.wheelSeedLoader = new DataLoader(wheelSeedBatchLoader, {
  cache: false,
});
