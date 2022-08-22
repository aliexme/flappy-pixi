import * as PIXI from 'pixi.js'

import { Pipe } from './pipes/Pipe'
import { type PipesController } from './pipes/PipesController'
import { type GroundController } from './ground/GroundController'
import { type BirdController } from './bird/BirdController'

type CollisionHandler = () => void

export class CollisionChecker {
  #handler: CollisionHandler
  #collisionTicker: PIXI.Ticker

  #pipesController: PipesController
  #groundController: GroundController
  #birdController: BirdController

  constructor(
    pipesController: PipesController,
    groundController: GroundController,
    birdController: BirdController,
    handler: CollisionHandler,
  ) {
    this.#pipesController = pipesController
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
    if (this.#hasCollisionWithGround() || this.#hasCollisionWithPipes()) {
      this.#handler()
    }
  }

  #hasCollisionWithGround(): boolean {
    const ground = this.#groundController.ground
    const bird = this.#birdController.bird

    return bird.y + bird.height / 2 >= ground.y
  }

  #hasCollisionWithPipes(): boolean {
    const pipePairs = this.#pipesController.pipePairs
    const bird = this.#birdController.bird
    const birdR = bird.height / 2
    const birdLeftX = bird.x - birdR
    const birdRightX = bird.x + birdR
    const birdTopY = bird.y - birdR
    const birdBottomY = bird.y + birdR

    return pipePairs.some((pipesPair) => {
      if (birdRightX < pipesPair.x) return false
      if (birdLeftX > pipesPair.x + Pipe.width) return false
      if (bird.y <= pipesPair.topPipe.y) return true
      if (bird.y >= pipesPair.bottomPipe.y) return true
      if (birdTopY > pipesPair.topPipe.y && birdBottomY < pipesPair.bottomPipe.y) return false

      if (birdLeftX >= pipesPair.x && birdRightX <= pipesPair.x + Pipe.width) {
        if (birdTopY <= pipesPair.topPipe.y) return true
        if (birdBottomY >= pipesPair.bottomPipe.y) return true
      }

      const topPipeCenterX = pipesPair.topPipe.x + Pipe.width / 2
      const topPipeCenterY = pipesPair.topPipe.y - Pipe.height / 2
      const bottomPipeCenterX = pipesPair.bottomPipe.x + Pipe.width / 2
      const bottomPipeCenterY = pipesPair.bottomPipe.y + Pipe.height / 2

      const topPipeDistX = Math.abs(bird.x - topPipeCenterX)
      const topPipeDistY = Math.abs(bird.y - topPipeCenterY)
      const bottomPipeDistX = Math.abs(bird.x - bottomPipeCenterX)
      const bottomPipeDistY = Math.abs(bird.x - bottomPipeCenterY)

      const dxTopPipe = topPipeDistX - Pipe.width / 2
      const dyTopPipe = topPipeDistY - Pipe.height / 2
      const dxBottomPipe = bottomPipeDistX - Pipe.width / 2
      const dyBottomPipe = bottomPipeDistY - Pipe.height / 2

      if ((dxTopPipe^2 + dyTopPipe^2) <= (birdR^2)) return true
      if ((dxBottomPipe^2 + dyBottomPipe^2) <= (birdR^2)) return true

      return false
    })
  }
}
