/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('game', (table) => {
    table.increments('id')
    table.integer('round')
    table.integer('number_of_rounds')
    table.string('status')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable('game')
}
