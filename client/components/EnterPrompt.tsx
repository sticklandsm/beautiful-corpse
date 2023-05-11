import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addPrompt } from '../apis/prompts'
import { nextRound } from '../apis/game'
import { getLastDrawingByGameId } from '../apis/drawings'
import ShowImage from './ShowImage'
import TurnFinished from './TurnFinished'

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function EnterPrompt() {
  const { gameId, roundId } = useParams()
  const [drawingTag, setDrawingTag] = useState('')
  const isItFirstRound = Number(roundId) === 1

  const [promptState, setPromptState] = useState('')
  const [promptSubmitted, changePromptSubmitted] = useState(false)

  useEffect(() => {
    if (roundId === '1') return
    getLastDrawingByGameId(Number(gameId))
      .then((fetchedDrawingTag) => {
        setDrawingTag(() => fetchedDrawingTag)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [gameId])

  function changeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    setPromptState(() => evt.target.value)
  }
  async function handleSubmit(
    evt: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) {
    evt.preventDefault()
    if (promptState === '') return
    const promptToAdd = { prompt: promptState, gameId: Number(gameId) }

    await addPrompt(promptToAdd)
    await nextRound(Number(gameId), 'drawing')
    changePromptSubmitted(() => true)
  }

  return (
    <div className="flex flex-col items-center justify-center dark:bg-slate-800 ">
      {!promptSubmitted && (
        <>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center ">
              <label className="text-teal-500 text-3xl font-extrabold text-center">
                {isItFirstRound
                  ? 'Please enter your first prompt'
                  : 'Look at this beautiful Artwork!'}
              </label>
              <label
                className=" text-orange-700 text-3xl font-extrabold "
                htmlFor="gameId"
              >
                {isItFirstRound
                  ? 'Make it something fun'
                  : 'But What does it mean?'}
              </label>
            </div>
            <br />
            <div className="flex flex-row items-center justify-center text-black-900 ">
              <input
                className="font-extrabold md:text-2xl text-xl border-2 border-black-900"
                type="text"
                name="prompt"
                onChange={changeHandler}
                placeholder={
                  isItFirstRound
                    ? `e.g. ${
                        subjects[randomIntFromInterval(0, subjects.length - 1)]
                      }`
                    : 'I interpet this as...'
                }
              />
              <div className="md:px-1"></div>

              <button
                className='className="m-3 md:p-3 p-4 rounded-3xl  hover:bg-lime-600 bg-lime-500  text-lime-900  font-extrabold md:text-2xl text-xl drop-shadow-lg'
                type="submit"
                onSubmit={handleSubmit}
              >
                GO
              </button>
            </div>
          </form>
          {!promptSubmitted && !isItFirstRound && (
            <ShowImage drawingTag={drawingTag} />
          )}
        </>
      )}
      <br />

      {promptSubmitted && (
        <>
          <TurnFinished
            gameId={gameId as string}
            roundId={Number(roundId) + 1}
          />
        </>
      )}
    </div>
  )
}

const subjects = [
  'Oddly specific cave paintings',
  'Doctor Whom',
  'Sean but wearing a hat',
  'Rainbow elephants',
  'Imperial unicorns',
  'Pretentious gorillas',
  'Pirate llamas',
  'Jungle robots',
  'Cybernetic mermaids',
  'Astral koalas',
  'Medieval cyborgs',
  'Arctic dragons',
  'Cyberpunk flamingos',
  'Time-traveling sloths',
  'Space llamas',
  'Mystic pandas',
  'Ghost pirates',
  'Digital seagulls',
  'Cosmic kangaroos',
  'Cyberspace bees',
  'Ancient aliens',
  'Steampunk penguins',
  'Samurai squirrels',
  'Electric zebras',
  'Crystal tigers',
  'Mechanical wolves',
  'Glittery rhinos',
  'Futuristic pandas',
  'Enchanted dragons',
  'Flaming icebergs',
  'Robotic hummingbirds',
  'Lunar unicorns',
  'Mythical llamas',
  'Alien octopuses',
  'Supernatural flamingos',
  'Timeless jellyfish',
  'Active sloths',
  'Ethereal sharks',
  'Invisible unicorns',
  'Mystical penguins',
  'Wisdom vs Intelligence',
  'Crazy camels',
  'Rainbow dolphins',
  'Hyperactive hippos',
  'Sonic elephants',
  'Fast snails',
  'Magical meerkats',
  'Dreaming sloths',
  'Solar owls',
  'Pixelated monkeys',
  'Virtual llamas',
  'A weirdo in a cape',
]
