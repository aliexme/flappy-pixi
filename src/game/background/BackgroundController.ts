import * as PIXI from 'pixi.js'

import { GameSettings } from '../GameSettings'
import { Background } from './Background'
import { Ground } from '../ground/Ground'

export class BackgroundController {
  #view: PIXI.Container
  #background: Background
  #movingTicker: PIXI.Ticker

  constructor(view: PIXI.Container) {
    this.#view = view
    this.#background = new Background()
    this.#movingTicker = new PIXI.Ticker()

    this.#movingTicker.add(() => {
      this.#moveBackground()
    })

    this.#view.addChild(this.#background)
    this.resetBackground()
  }

  startMoving() {
    this.#movingTicker.start()
  }

  stopMoving() {
    this.#movingTicker.stop()
  }

  resetBackground() {
    this.#background.width = GameSettings.width
    this.#background.x = 0
    this.#background.y = GameSettings.height - Background.height - Ground.height
  }

  #moveBackground() {
    this.#background.tilePosition.x -= GameSettings.backgroundMovingSpeed
  }
}
