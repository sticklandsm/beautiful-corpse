import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getGameStatus } from '../apis/game'

export default function ContinueGame() {
  const { gameId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getGameStatus(Number(gameId))
      .then((status) => {
        if (!status.success) {
          navigate(`/`)
          return
        }
        navigate(
          `/game/${gameId}/round/${status.response.round}/${status.response.status}`
        )
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return <></>
}
