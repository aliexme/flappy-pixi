import * as PIXI from 'pixi.js'

import { BackgroundController } from './background/BackgroundController'
import { GroundController } from './ground/GroundController'
import { BirdController } from './bird/BirdController'
import { GameSettings } from './GameSettings'

export class GameController {
  #view: PIXI.Container
  #emptySprite: PIXI.Sprite

  #backgroundController: BackgroundController
  #groundController: GroundController
  #birdController: BirdController

  #running = false

  constructor(view: PIXI.Container) {
    this.#view = view
    this.#view.interactive = true
    this.#view.buttonMode = true
    this.#emptySprite = new PIXI.Sprite()
    this.#emptySprite.width = GameSettings.width
    this.#emptySprite.height = GameSettings.height
    this.#view.addChild(this.#emptySprite)

    this.#backgroundController = new BackgroundController(this.#view)
    this.#groundController = new GroundController(this.#view)
    this.#birdController = new BirdController(this.#view)
  }

  init() {
    this.#backgroundController.startMoving()
    this.#groundController.startMoving()
    this.#birdController.startFlapping()

    this.#view.on('pointerdown', () => {
      this.start()
    })
  }

  start() {
    this.#birdController.startMoving()
    this.#birdController.flyUp()

    this.#running = true
  }

  reset() {
    this.#emptySprite.width = GameSettings.width
    this.#emptySprite.height = GameSettings.height

    this.#backgroundController.resetBackground()
    this.#groundController.resetGround()
    this.#birdController.stopMoving()
    this.#birdController.resetBird()

    this.#running = false
  }
}
