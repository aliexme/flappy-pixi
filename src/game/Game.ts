import * as PIXI from 'pixi.js'

import { GameSettings } from './GameSettings'
import { GameController } from './GameController'
import birdDownFlap from '../assets/sprites/bird-downflap.png'
import birdMidFlap from '../assets/sprites/bird-midflap.png'
import birdUpFlap from '../assets/sprites/bird-upflap.png'
import ground from '../assets/sprites/ground.png'

export class Game {
  #app: PIXI.Application
  #gameController: GameController | undefined

  constructor() {
    this.#app = new PIXI.Application({ autoStart: false })
  }

  start() {
    this.#app.ticker.start()
    this.#loadAssets()
  }

  render(container: HTMLElement) {
    this.#fitRenderer(container)
    container.appendChild(this.#app.view)

    window.addEventListener('resize', () => {
      this.#fitRenderer(container)
    })
  }

  #loadAssets() {
    const loader = PIXI.Loader.shared
    loader.add('birdDownFlap', birdDownFlap)
    loader.add('birdMidFlap', birdMidFlap)
    loader.add('birdUpFlap', birdUpFlap)
    loader.add('ground', ground)

    loader.onComplete.add(() => {
      this.#onAssetsLoaded()
    })

    loader.load()
  }

  #onAssetsLoaded() {
    this.#gameController = new GameController(this.#app.stage)
    this.#gameController.init()
  }

  #fitRenderer(container: HTMLElement) {
    const containerSizes = container.getBoundingClientRect()
    this.#app.renderer.resize(containerSizes.width, containerSizes.height)
    GameSettings.resize(this.#app.renderer.width, this.#app.renderer.height)
    this.#gameController?.reset()
  }
}
