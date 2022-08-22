import * as PIXI from 'pixi.js'
import { sound } from '@pixi/sound'

import { GameSettings } from '../GameSettings'
import { Bird } from './Bird'
import { clamp } from '../../utils/numbers'

export class BirdController {
  #view: PIXI.Container
  #bird: Bird
  #gravityTicker: PIXI.Ticker

  constructor(view: PIXI.Container) {
    this.#view = view
    this.#bird = new Bird()
    this.#gravityTicker = new PIXI.Ticker()

    this.#gravityTicker.add((dt) => {
      this.#moveBird(dt)
    })

    this.#view.addChild(this.#bird)
    this.resetBird()
  }

  get bird() {
    return this.#bird
  }

  startFlapping() {
    this.#bird.play()
  }

  stopFlapping() {
    this.#bird.stop()
  }

  startMoving() {
    this.#gravityTicker.start()
  }

  stopMoving() {
    this.#gravityTicker.stop()
  }

  flyUp() {
    this.#bird.velocityY = -GameSettings.birdFlyUpVelocityY
    sound.play('wing')
  }

  resetBird() {
    this.#bird.x = GameSettings.width / 3
    this.#bird.y = GameSettings.height / 2.75
    this.#bird.rotation = 0
    this.#bird.velocityY = 0
  }

  #moveBird(dt: number) {
    const updatedY = this.#bird.y + this.#bird.velocityY * dt + GameSettings.gravityPower * dt^2 / 2
    const updatedVelocityY = this.#bird.velocityY + GameSettings.gravityPower * dt
    this.#bird.y = clamp(updatedY, 0, GameSettings.height)
    this.#bird.velocityY = updatedVelocityY
  }
}
