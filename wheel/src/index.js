const express = require('express');
const bodyParser = require('body-parser');
const { knex } = require('./knex');
const {
  getBets,
  spinWheel,
  getSeed,
  rotateSeed,
  getActiveSeed,
  getSeeds
} = require('./wheel');

const response = (handler) => async (req, res) => {
  try {
    res.send(await handler(req.body));
  } catch (e) {
    res.status(400).send(e.message);
  }
};

async function start() {
  await knex.migrate.latest();
  const app = express();

  app.use(bodyParser.json());

  app.use((req, res, next) => {
    next();
  });

  app.post(
    '/get-bets',
    response(async ({ user, limit, offset }) =>
      getBets({ user, limit, offset })
    )
  );

  app.post(
    '/spin-wheel',
    response(async ({ user, amount }) =>
      spinWheel({ user, amount })
    )
  );

  app.post(
    '/get-active-seed',
    response(async ({ user }) => getActiveSeed({ user }))
  );

  app.post(
    '/rotate-seed',
    response(async ({ user }) => rotateSeed({ user }))
  );

  app.post(
    '/get-seed',
    response(async ({ seedId }) => getSeed({ seedId }))
  );

  app.post(
    '/get-seeds',
    response(async ({ seedIds }) => getSeeds({ seedIds }))
  );

  app.listen(80);
}

start();
