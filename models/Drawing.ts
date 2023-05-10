export interface DrawingDB {
  drawingBinary: Blob
  gameId: number
}

export interface Drawing extends DrawingDB {
  id: number
}

export interface DrawingWithFormData {
  drawingFormData: FormData
  gameId: number
}

export interface DrawingDbBinary {
  drawingBinary: Buffer
  gameId: number
}

export interface DrawingBinary extends DrawingDbBinary {
  id: number
}
