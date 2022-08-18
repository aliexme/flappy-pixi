import * as PIXI from 'pixi.js'

import birdMidFlap from './assets/sprites/bird-midflap.png'

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
    loader.add('birdMidFlap', birdMidFlap)

    loader.onComplete.add(() => {
      this.#onAssetsLoaded()
    })

    loader.load()
  }

  #onAssetsLoaded() {
    const bird = PIXI.Sprite.from('birdMidFlap')
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
