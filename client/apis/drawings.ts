export async function addDrawing(drawingBinary: Blob, gameId: number) {
  const formData = new FormData()

  formData.append('file', drawingBinary)
  formData.append('gameId', gameId.toString())

  fetch('/api/v1/game/drawing', {
    method: 'POST',
    body: formData,
  })
    .then(() => {})
    .catch((error) => {
      console.error('Error uploading file:', error)
    })
}

export async function getLastDrawingByGameId(gameId: number) {
  const response = await fetch(`/api/v1/game/drawing/${gameId}`)
  const base64String = (await response.text()).trim()
  const cleanBase64String = base64String.replace(/^"|"$/g, '')

  return `data:image/png;base64,${cleanBase64String}`
}
