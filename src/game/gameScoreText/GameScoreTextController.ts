import type * as PIXI from 'pixi.js'

import { GameSettings } from '../GameSettings'
import { type GameModel } from '../GameModel'
import { GameScoreText } from './GameScoreText'

export class GameScoreTextController {
  #model: GameModel
  #view: PIXI.Container
  #gameScoreText: GameScoreText

  constructor(model: GameModel, view: PIXI.Container) {
    this.#model = model
    this.#view = view
    this.#gameScoreText = new GameScoreText(this.#model.score)

    this.updateScoreText()
    this.resetScoreText()
    this.#view.addChild(this.#gameScoreText)
  }

  updateScoreText() {
    this.#gameScoreText.text = this.#model.score
  }

  resetScoreText() {
    this.updateScoreText()
    this.#gameScoreText.x = GameSettings.width / 2
    this.#gameScoreText.y = 80
  }
}
