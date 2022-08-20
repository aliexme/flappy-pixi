import * as PIXI from 'pixi.js'

import { type GroundController } from './ground/GroundController'
import { Bird } from './bird/Bird'
import { type BirdController } from './bird/BirdController'

type CollisionHandler = () => void

export class CollisionChecker {
  #handler: CollisionHandler
  #collisionTicker: PIXI.Ticker

  #groundController: GroundController
  #birdController: BirdController

  constructor(
    groundController: GroundController,
    birdController: BirdController,
    handler: CollisionHandler,
  ) {
    this.#groundController = groundController
    this.#birdController = birdController
    this.#handler = handler
    this.#collisionTicker = new PIXI.Ticker()

    this.#collisionTicker.add(() => {
      this.#checkCollision()
    })
  }

  start() {
    this.#collisionTicker.start()
  }

  stop() {
    this.#collisionTicker.stop()
  }

  #checkCollision() {
    if (this.#birdController.bird.y + Bird.height / 2 >= this.#groundController.ground.y) {
      this.#handler()
      return
    }
  }
}
