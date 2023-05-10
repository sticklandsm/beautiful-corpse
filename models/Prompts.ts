export interface PromptDB {
  prompt: string
  gameId: number
}

export interface Prompt extends PromptDB {
  id: number
}

export interface gameRound {
  round: number
  prompt: string
  drawing: string
}
