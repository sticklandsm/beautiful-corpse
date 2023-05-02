import { useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { resetCanvas } from '../slices/canvasSettings'

function useCanvas(scale: number) {
  const dispatch = useAppDispatch()
  const lineColour = useAppSelector((state) => state.canvasSettings.lineColour)
  const resetCanvasTrueOrFalse = useAppSelector(
    (state) => state.canvasSettings.resetCanvasTrueOrFalse
  )

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.error('no canvas')
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      console.error(`canvas.getContext('2d') is returning null for some reason`)
      return
    }

    if (resetCanvasTrueOrFalse) {
      context.clearRect(0, 0, canvas.width, canvas.height)
      dispatch(resetCanvas(false))
    }

    if (!(canvas.width === window.innerWidth * scale)) {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      canvas.width = screenWidth * scale
      canvas.height = screenHeight * scale
    }
    let isDrawing = false
    let lastX = 0
    let lastY = 0

    const handleMouseDown = (event: MouseEvent) => {
      isDrawing = true
      lastX = event.offsetX
      lastY = event.offsetY
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDrawing) {
        return
      }
      context.strokeStyle = lineColour
      context.lineWidth = 50

      const currentX = event.offsetX
      const currentY = event.offsetY

      context.beginPath()
      context.moveTo(lastX, lastY)
      context.lineTo(currentX, currentY)
      context.stroke()

      lastX = currentX
      lastY = currentY
    }

    const handleMouseUp = () => {
      isDrawing = false
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
    }
  }, [lineColour, resetCanvasTrueOrFalse, scale])

  return canvasRef
}

export default useCanvas
