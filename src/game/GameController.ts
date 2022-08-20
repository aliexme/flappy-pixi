import type * as PIXI from 'pixi.js'

import { BirdController } from './bird/BirdController'
import { GroundController } from './ground/GroundController'

export class GameController {
  #view: PIXI.Container
  #birdController: BirdController
  #groundController: GroundController

  constructor(view: PIXI.Container) {
    this.#view = view
    this.#birdController = new BirdController(this.#view)
    this.#groundController = new GroundController(this.#view)
  }

  init() {
    this.#birdController.startFlapping()
    this.#groundController.startMoving()
  }

  reset() {
    this.#birdController.stopMoving()
    this.#birdController.resetPosition()
    this.#groundController.resetGround()
  }
}
