exports.up = async (knex) => {
  await knex.schema.createTable('statistic', (table) => {
    table.uuid('id').primary();

    table.string('user').notNull();

    table.float('wagered').notNull();
    table.float('profit').notNull();
    table.string('game').notNull();
    table.unique(['user', 'game']);
  });
};

exports.down = async () => {};
