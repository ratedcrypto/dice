exports.up = async (knex) => {
  await knex.schema.createTable('statistic', (table) => {
    table.uuid('id').primary();
    table.string('user').notNull().unique();
    table.float('wagered').notNull();
    table.float('profit').notNull();
    table.string('game').notNull();
  });
};

exports.down = async () => {};
