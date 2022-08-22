import * as PIXI from 'pixi.js'
import { sound } from '@pixi/sound'

import { GameModel } from './GameModel'
import { GameSettings } from './GameSettings'
import { CollisionChecker } from './CollisionChecker'
import { BackgroundController } from './background/BackgroundController'
import { GroundController } from './ground/GroundController'
import { PipesController } from './pipes/PipesController'
import { BirdController } from './bird/BirdController'

export class GameController {
  #model: GameModel
  #view: PIXI.Container
  #emptySprite: PIXI.Sprite
  #collisionChecker: CollisionChecker

  #backgroundController: BackgroundController
  #pipesController: PipesController
  #groundController: GroundController
  #birdController: BirdController

  constructor(view: PIXI.Container) {
    this.#model = new GameModel()
    this.#view = view
    this.#view.interactive = true
    this.#view.buttonMode = true
    this.#emptySprite = new PIXI.Sprite()
    this.#emptySprite.width = GameSettings.width
    this.#emptySprite.height = GameSettings.height
    this.#view.addChild(this.#emptySprite)

    this.#backgroundController = new BackgroundController(this.#view)
    this.#pipesController = new PipesController(this.#view)
    this.#groundController = new GroundController(this.#view)
    this.#birdController = new BirdController(this.#view)

    this.#collisionChecker = new CollisionChecker(
      this.#pipesController,
      this.#groundController,
      this.#birdController,
      this.#onCollision,
    )
  }

  init() {
    this.#backgroundController.startMoving()
    this.#groundController.startMoving()
    this.#birdController.startFlapping()

    this.#view.on('pointerdown', () => {
      this.#mainAction()
    })

    document.addEventListener('keydown', (key) => {
      if (key.code === 'Space' || key.code === 'ArrowUp') {
        this.#mainAction()
      }
    })
  }

  start() {
    this.#model.run()
    this.#collisionChecker.start()
    this.#pipesController.startMoving()
    this.#birdController.startMoving()
    this.#birdController.flyUp()
  }

  pause() {
    this.#model.pause()
    this.#collisionChecker.stop()
    this.#backgroundController.stopMoving()
    this.#pipesController.stopMoving()
    this.#groundController.stopMoving()
    this.#birdController.stopFlapping()
    this.#birdController.stopMoving()
  }

  resume() {
    this.#model.resume()
    this.#collisionChecker.start()
    this.#backgroundController.startMoving()
    this.#pipesController.startMoving()
    this.#groundController.startMoving()
    this.#birdController.startFlapping()
    this.#birdController.startMoving()
  }

  setGameOver() {
    this.#model.setGameOver()
    this.#collisionChecker.stop()
    this.#backgroundController.stopMoving()
    this.#pipesController.stopMoving()
    this.#groundController.stopMoving()
    this.#birdController.stopFlapping()
    this.#birdController.stopMoving()
  }

  restart() {
    this.#model.run()
    this.#collisionChecker.start()
    this.#backgroundController.resetBackground()
    this.#backgroundController.startMoving()
    this.#pipesController.resetPipes()
    this.#pipesController.startMoving()
    this.#groundController.resetGround()
    this.#groundController.startMoving()
    this.#birdController.resetBird()
    this.#birdController.startFlapping()
    this.#birdController.startMoving()
    this.#birdController.flyUp()
  }

  reset() {
    this.#model.reset()
    this.#collisionChecker.stop()
    this.#emptySprite.width = GameSettings.width
    this.#emptySprite.height = GameSettings.height

    this.#backgroundController.resetBackground()
    this.#backgroundController.startMoving()
    this.#pipesController.resetPipes()
    this.#pipesController.stopMoving()
    this.#groundController.resetGround()
    this.#groundController.startMoving()
    this.#birdController.resetBird()
    this.#birdController.startFlapping()
    this.#birdController.stopMoving()
  }

  #mainAction() {
    if (this.#model.running) {
      this.#birdController.flyUp()
    } else if (this.#model.paused) {
      this.resume()
    } else if (this.#model.gameOver) {
      this.restart()
    } else {
      this.start()
    }
  }

  #onCollision = () => {
    sound.play('hit')
    sound.play('die')
    this.setGameOver()
  }
}
