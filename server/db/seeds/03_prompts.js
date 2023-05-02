/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('prompts').del()
  await knex('prompts').insert([
    { id: 1, prompt: 'some prompt', game_id: 1 },
    { id: 2, prompt: 'some prompt', game_id: 1 },
    { id: 3, prompt: 'some prompt', game_id: 1 },
    { id: 4, prompt: 'some prompt', game_id: 2 },
    { id: 5, prompt: 'some prompt', game_id: 2 },
    { id: 6, prompt: 'some prompt', game_id: 2 },
  ])
}
