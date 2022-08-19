import * as PIXI from 'pixi.js'

import { Bird } from './entities/Bird'
import birdDownFlap from './assets/sprites/bird-downflap.png'
import birdMidFlap from './assets/sprites/bird-midflap.png'
import birdUpFlap from './assets/sprites/bird-upflap.png'

export class Game {
  #app: PIXI.Application

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

    loader.onComplete.add(() => {
      this.#onAssetsLoaded()
    })

    loader.load()
  }

  #onAssetsLoaded() {
    const bird = new Bird()
    bird.anchor.set(0.5)
    this.#app.stage.addChild(bird)

    bird.x = this.#app.screen.width / 2
    bird.y = this.#app.screen.height / 2

    this.#app.ticker.add((dt) => {
      bird.rotation -= 0.01 * dt
    })
  }

  #fitRenderer(container: HTMLElement) {
    const containerSizes = container.getBoundingClientRect()
    this.#app.renderer.resize(containerSizes.width, containerSizes.height)
  }
}
