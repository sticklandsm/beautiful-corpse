/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('game_order', (table) => {
    table.increments('id')
    table.integer('previous_prompt_id').references('prompts.id')
    table.integer('drawing_id').references('drawings.id')
    table.integer('game_id').references('game.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable('drawings')
}
