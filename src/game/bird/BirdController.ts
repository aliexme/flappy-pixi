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
      this.#bird.rotation += 0.03 * dt
    })

    this.#view.addChild(this.#bird)
    this.resetPosition()
  }

  start() {
    this.startFlapping()
    this.startMoving()
  }

  stop() {
    this.stopFlapping()
    this.stopMoving()
  }

  startFlapping() {
    this.#bird.play()
  }

  startMoving() {
    this.#movingTicker.start()
  }

  stopFlapping() {
    this.#bird.stop()
  }

  stopMoving() {
    this.#movingTicker.stop()
  }

  flyUp() {
    this.#bird.y += 10
  }

  resetPosition() {
    this.#bird.x = GameSettings.width / 2
    this.#bird.y = GameSettings.height / 2
  }
}
