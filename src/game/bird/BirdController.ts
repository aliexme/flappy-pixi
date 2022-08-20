import * as PIXI from 'pixi.js'

import { GameSettings } from '../GameSettings'
import { Bird } from './Bird'

export class BirdController {
  #view: PIXI.Container
  #bird: Bird
  #movingTicker: PIXI.Ticker

  constructor(view: PIXI.Container) {
    this.#view = view
    this.#bird = new Bird()
    this.#movingTicker = new PIXI.Ticker()

    this.#movingTicker.add((dt) => {
      this.#moveBird(dt)
    })

    this.#view.addChild(this.#bird)
    this.resetBird()
  }

  startFlapping() {
    this.#bird.play()
  }

  stopFlapping() {
    this.#bird.stop()
  }

  startMoving() {
    this.#movingTicker.start()
  }

  stopMoving() {
    this.#movingTicker.stop()
  }

  flyUp() {
    this.#bird.y -= 10
  }

  resetBird() {
    this.#bird.x = GameSettings.width / 3
    this.#bird.y = GameSettings.height / 2.75
    this.#bird.rotation = 0
  }

  #moveBird(dt: number) {
    this.#bird.rotation += 0.03 * dt
  }
}
