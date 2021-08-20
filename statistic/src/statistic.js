const { v4: uuid } = require('uuid');
const { knex } = require('./knex');

exports.updateStatistic = async ({ user, game, amount, payout }) => {
  await knex.raw(
    `
      insert into statistic (
        "id", "user", "game", "wagered", "profit"
      ) values (
        :id, :user, :game, :wagered, :profit
      )
      on conflict ("user", "game") do update
      set 
      wagered = statistic.wagered + :wagered,
      profit = statistic.profit + :profit
    `,
    {
      id: uuid(),
      user,
      game,
      wagered: amount,
      profit: payout - amount,
    }
  );
};

exports.getStatistics = async ({ user, game }) => {
  const statistics = await knex('statistic').where({user, game});
  return statistics;
};


exports.getStatistics = async ({ user, game }) => {
  const statistics = await knex('statistic').where((builder) => {
    if (!game) {
      builder.where({ user });
    } else {
      builder.where({ user, game });
    }
  });

  return statistics;
};
