import type * as PIXI from 'pixi.js'

import { BirdController } from './bird/BirdController'

export class GameController {
  #view: PIXI.Container
  #birdController: BirdController

  constructor(view: PIXI.Container) {
    this.#view = view
    this.#birdController = new BirdController(this.#view)
  }

  init() {
    this.#birdController.start()
  }

  reset() {
    this.#birdController.resetPosition()
  }
}
