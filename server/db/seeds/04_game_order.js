/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('game_order').del()
  await knex('game_order').insert([
    { id: 1, previous_prompt_id: 1, drawing_id: 1, game_id: 1 },
    { id: 2, previous_prompt_id: 2, drawing_id: 2, game_id: 1 },
    { id: 3, previous_prompt_id: 3, drawing_id: 3, game_id: 1 },
    { id: 4, previous_prompt_id: 4, drawing_id: 4, game_id: 2 },
    { id: 5, previous_prompt_id: 5, drawing_id: 5, game_id: 2 },
    { id: 6, previous_prompt_id: 6, drawing_id: 6, game_id: 2 },
  ])
}
