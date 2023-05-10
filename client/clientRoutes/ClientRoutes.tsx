import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import EnterPrompt from '../components/EnterPrompt'
import EnterDrawing from '../components/EnterDrawing'
import GameCarousel from '../components/GameCarousel'

export default function ClientRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/game/:gameId/round/:roundId/prompt"
          element={<EnterPrompt />}
        />
        <Route
          path="/game/:gameId/round/:roundId/drawing"
          element={<EnterDrawing />}
        />
        <Route path="/showResults/:gameId" element={<GameCarousel />} />
      </Routes>
    </>
  )
}
