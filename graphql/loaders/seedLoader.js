const DataLoader = require('dataloader');
const axios = require('axios');

const batchDiceSeeds = async (seedIds) => {
    const seeds = await axios.post(`http://dice/get-seeds`, { seedIds });
    const seedMap = {};
    seeds.data.forEach((seed) => {
        seedMap[seed.id] = seed;
    });

    return seedIds.map((id) => seedMap[id]);
};

const batchWheelSeeds = async (seedIds) => {
    const seeds = await axios.post(`http://wheel/get-seeds`, { seedIds });
    const seedMap = {};
    seeds.data.forEach((seed) => {
        seedMap[seed.id] = seed;
    });

    return seedIds.map((id) => seedMap[id]);
};

exports.diceSeedLoader = new DataLoader(batchDiceSeeds);
exports.wheelSeedLoader = new DataLoader(batchWheelSeeds);