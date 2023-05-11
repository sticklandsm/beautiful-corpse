import { useEffect, useState } from 'react'
import { gameRound } from '../../models/Prompts'
import { useParams } from 'react-router-dom'
import { getWholeGameById } from '../apis/game'
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi'

export default function GameCarousel() {
  const [arrayOfElements, setArrayOfElements] = useState([] as JSX.Element[])
  const lengthOfArrayElements = arrayOfElements.length
  const [currentElementNumber, setCurrentElementNumber] = useState(0)
  const { gameId } = useParams()

  function changeImage(previousOrNext: number) {
    setCurrentElementNumber((current) => current + previousOrNext)
  }

  useEffect(() => {
    getWholeGameById(Number(gameId))
      .then((game) => {
        game.forEach((round: gameRound, index: number) => {
          setArrayOfElements((arrayOfElements) => [
            ...arrayOfElements,
            <p key={index}>{round.prompt}</p>,
            round.drawing ? (
              <img
                key={index * 10}
                src={round.drawing}
                alt={'drawing round ' + index}
              />
            ) : (
              <></>
            ),
          ])
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }, [gameId])

  return (
    <>
      <div className="w-full md:w-3/5 h-4/6 relative m-auto dark:bg-black-300">
        <div className=" flex items-center justify-center h-full border-[20px] border-lime-500 text-lime-900 text-3xl font-extrabold">
          {arrayOfElements[currentElementNumber] &&
            arrayOfElements[currentElementNumber]}
        </div>
        <div className="flex justify-center ">
          <div className="absolute inset-y-0 left-0 flex justify-center items-center opacity-60">
            {currentElementNumber !== 0 && (
              <button
                className="bg-white bg-opacity-100 rounded-full"
                onClick={() => {
                  changeImage(-1)
                }}
              >
                <HiArrowCircleLeft size={40} />
              </button>
            )}
          </div>
          <div className=" absolute inset-y-0 right-0 flex justify-center items-center opacity-60">
            {currentElementNumber !== lengthOfArrayElements - 1 && (
              <button
                className="bg-white bg-opacity-100 rounded-full"
                onClick={() => {
                  changeImage(1)
                }}
              >
                <HiArrowCircleRight size={40} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
