/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('game').del()
  await knex('game').insert([
    { id: 1, round: 3, number_of_rounds: 3, status: 'finished' },
    { id: 2, round: 3, number_of_rounds: 3, status: 'finished' },
  ])
}
