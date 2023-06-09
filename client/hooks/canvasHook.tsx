import { useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { resetCanvas } from '../slices/canvasSettings'

function useCanvas(scale: number) {
  const dispatch = useAppDispatch()
  const lineColour = useAppSelector((state) => state.canvasSettings.lineColour)
  const brushSize = useAppSelector((state) => state.canvasSettings.brushWidth)
  const resetCanvasTrueOrFalse = useAppSelector(
    (state) => state.canvasSettings.resetCanvasTrueOrFalse
  )

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const getTouchPos = (canvas: HTMLCanvasElement, touch: Touch) => {
    const rect = canvas.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    return { offsetX: x, offsetY: y }
  }

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
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight

      if (screenWidth < 600) {
        canvas.width = screenWidth * 0.9
      } else {
        canvas.width = screenWidth * scale * 0.7
      }
      canvas.height = screenHeight * scale
      if (screenHeight > 600) {
        canvas.height = screenHeight * (scale * 1.3)
      } else {
        canvas.height = screenHeight * scale
      }
    }

    if (resetCanvasTrueOrFalse) {
      context.clearRect(0, 0, canvas.width, canvas.height)
      dispatch(resetCanvas(false))
    }

    let isDrawing = false
    let lastX = 0
    let lastY = 0

    const handleMouseDown = (event: MouseEvent) => {
      isDrawing = true
      lastX = event.offsetX
      lastY = event.offsetY
    }
    const handleTouchStart = (event: TouchEvent) => {
      isDrawing = true
      const { offsetX, offsetY } = getTouchPos(canvas, event.touches[0])
      lastX = offsetX
      lastY = offsetY
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDrawing) {
        return
      }
      context.strokeStyle = lineColour
      context.lineWidth = brushSize

      const currentX = event.offsetX
      const currentY = event.offsetY

      context.beginPath()
      context.moveTo(lastX, lastY)
      context.lineTo(currentX, currentY)
      context.stroke()

      lastX = currentX
      lastY = currentY
    }

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault()
      if (!isDrawing) {
        return
      }
      const { offsetX, offsetY } = getTouchPos(canvas, event.touches[0])
      context.strokeStyle = lineColour
      context.lineWidth = brushSize

      context.beginPath()
      context.moveTo(lastX, lastY)
      context.lineTo(offsetX, offsetY)
      context.stroke()

      lastX = offsetX
      lastY = offsetY
    }

    const handleMouseUp = () => {
      isDrawing = false
    }
    const handleTouchEnd = () => {
      isDrawing = false
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('touchstart', handleTouchStart, false)
    canvas.addEventListener('touchmove', handleTouchMove, false)
    canvas.addEventListener('touchend', handleTouchEnd, false)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('touchstart', handleTouchStart, false)
      canvas.removeEventListener('touchmove', handleTouchMove, false)
      canvas.removeEventListener('touchend', handleTouchEnd, false)
    }
  }, [brushSize, lineColour, resetCanvasTrueOrFalse, scale])

  return canvasRef
}

export default useCanvas
