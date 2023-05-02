import request from 'superagent'
import { DrawingDB, DrawingWithFormData } from '../../models/Drawing'

const rootUrl = '/api/v1/game/'

export async function addDrawing(drawingToAdd: DrawingDB) {
  const formData = new FormData()

  formData.append('file', drawingToAdd.drawingBinary)
  formData.append('gameId', drawingToAdd.gameId.toString())
  // const drawingWithFormData = {
  //   drawingFormData: formData,
  //   gameId: drawingToAdd.gameId,
  // } as drawingWithFormData

  fetch('/api/v1/game', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      console.log('File uploaded successfully')
    })
    .catch((error) => {
      console.error('Error uploading file:', error)
    })
}

export async function getDrawingById(id: number) {
  // return request.get(rootUrl + '/drawing').then((res) => {
  //   return res.body.fruits
  // })

  const fetchedDrawing = await request.get(rootUrl + '/drawing/' + id)
  console.log(fetchedDrawing.body)
}
