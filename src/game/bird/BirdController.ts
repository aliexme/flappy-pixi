import * as PIXI from 'pixi.js'
import { sound } from '@pixi/sound'

import { GameSettings } from '../GameSettings'
import { Bird } from './Bird'
import { clamp } from '../../utils/numbers'

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
    this.#movingTicker.start()
  }

  stopMoving() {
    this.#movingTicker.stop()
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
    const nextY = this.#bird.y + this.#bird.velocityY * dt + GameSettings.gravityPower * dt^2 / 2
    const nextVelocityY = this.#bird.velocityY + GameSettings.gravityPower * dt
    const dRotation = nextVelocityY > GameSettings.birdFlyUpVelocityY / 1.25 ? nextVelocityY / 80 : -0.125
    const nextRotation = this.#bird.rotation + dRotation

    this.#bird.y = clamp(nextY, 0, GameSettings.height)
    this.#bird.velocityY = nextVelocityY
    this.#bird.rotation = clamp(nextRotation, -0.3, 0.7)
  }
}
