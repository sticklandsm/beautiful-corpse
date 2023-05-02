import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchFruits } from '../slices/fruits'
import Canvas from './Canvas'
import ColourChanger from './ColourChanger'

const coloursList = ['blue', 'red', 'green', 'orange']

function App() {
  return (
    <>
      <div className="app">
        <h1 className="stroke-zinc-950">
          Fullstack Boilerplate - with Fruits!
        </h1>
        <Canvas />
      </div>
      <div>
        {coloursList.map((colour) => {
          return <ColourChanger key={colour} colourToChangeTo={colour} />
        })}
      </div>
    </>
  )
}

export default App

// ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
