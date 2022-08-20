import * as PIXI from 'pixi.js'

import { GameSettings } from '../GameSettings'
import { Ground } from './Ground'

export class GroundController {
  #view: PIXI.Container
  #ground: Ground
  #movingTicker: PIXI.Ticker

  constructor(view: PIXI.Container) {
    this.#view = view
    this.#ground = new Ground()
    this.#movingTicker = new PIXI.Ticker()

    this.#movingTicker.add(() => {
      this.#moveGround()
    })

    this.#view.addChild(this.#ground)
    this.resetGround()
  }

  startMoving() {
    this.#movingTicker.start()
  }

  stopMoving() {
    this.#movingTicker.stop()
  }

  resetGround() {
    this.#ground.width = GameSettings.width
    this.#ground.height = Ground.height
    this.#ground.x = 0
    this.#ground.y = GameSettings.height - Ground.height
  }

  #moveGround() {
    this.#ground.tilePosition.x -= GameSettings.groundMovingSpeed
  }
}
