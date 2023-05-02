export interface DrawingDB {
  drawingBinary: Blob
  gameId: number
}

export interface drawing extends DrawingDB {
  id: number
}

export interface drawingWithFormData {
  drawingFormData: FormData
  gameId: number
}

export interface DrawingDbBinary {
  drawingBinary: BinaryData
  gameId: number
}

export interface DrawingBinary extends DrawingDbBinary {
  id: number
}
