exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('favorites', (table) => {
      table.increments('id').primary();
      table.integer('book_id').notNullable().references('books.id').onDelete('CASCADE');
      table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE');
      table.timestamps(true, true);

    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('favorites')
  ])
};
