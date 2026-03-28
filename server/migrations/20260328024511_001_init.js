/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('bookings', table => {
      table.increments('id').primary();
      table.string('name', 100).notNullable();
      table.string('phone', 20).notNullable();
      table.string('brand', 50).notNullable();
      table.string('model', 100).notNullable();
      table.string('year', 10).notNullable();
      table.text('service').notNullable();
      table.date('date').notNullable();
      table.string('status', 20).defaultTo('pending'); // pending, confirmed, cancelled
      table.datetime('created_at').defaultTo(knex.fn.now());
    })
    .createTable('contacts', table => {
      table.increments('id').primary();
      table.string('name', 100).notNullable();
      table.string('contactInfo', 150).notNullable();
      table.text('message').notNullable();
      table.datetime('created_at').defaultTo(knex.fn.now());
    })
    .createTable('testimonials', table => {
      table.increments('id').primary();
      table.string('name', 100).notNullable();
      table.text('message').notNullable();
      table.integer('rating').defaultTo(5);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('testimonials')
    .dropTableIfExists('contacts')
    .dropTableIfExists('bookings');
};
