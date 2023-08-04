import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type CanvasSettings = {
  lineColour: string
  resetCanvasTrueOrFalse: boolean
  brushWidth: number
  canvasHistory: []
  undoneState: any
}

const initialState: CanvasSettings = {
  lineColour: 'black',
  resetCanvasTrueOrFalse: true,
  brushWidth: 5,
  history: [],
  undoneState: '',
}

const canvasSettingsSlice = createSlice({
  name: 'canvasSettings',
  initialState,
  reducers: {
    changeColour: (state, action: PayloadAction<string>) => {
      const newColour = action.payload
      const newCanvasSettings = { ...state, lineColour: newColour }

      return newCanvasSettings
    },
    resetCanvas: (state, action: PayloadAction<boolean>) => {
      const newCanvasSettings = {
        ...state,
        resetCanvasTrueOrFalse: action.payload,
      }

      return newCanvasSettings
    },
    changeBrushWidth: (state, action: PayloadAction<number>) => {
      const newBrushWidth = action.payload
      const newCanvasSettings = { ...state, brushWidth: newBrushWidth }
      return newCanvasSettings
    },
    addDrawing: (state, action) => {
      state.canvasHistory.push(action.payload)
    },
    undoLastDrawing: (state) => {
      if (state.canvasHistory.length > 0) {
        state.undoneState = state.canvasHistory.slice()
        state.canvasHistory.pop()
      }
    },
  },
})
export const { changeColour, resetCanvas, changeBrushWidth } =
  canvasSettingsSlice.actions
export default canvasSettingsSlice.reducer
