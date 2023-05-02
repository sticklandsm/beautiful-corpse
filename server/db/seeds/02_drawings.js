/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('drawings').del()
  await knex('drawings').insert([
    { id: 1, drawing: 1010101, game_id: 1 },
    { id: 2, drawing: 1010101, game_id: 1 },
    { id: 3, drawing: 1010101, game_id: 1 },
    { id: 4, drawing: 1010101, game_id: 2 },
    { id: 5, drawing: 1010101, game_id: 2 },
    { id: 6, drawing: 1010101, game_id: 2 },
  ])
}
