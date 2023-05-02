/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('game').del()
  await knex('game').insert([
    { id: 1, number_of_rounds: 3 },
    { id: 2, number_of_rounds: 3 },
  ])
}
