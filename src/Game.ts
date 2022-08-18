import * as PIXI from 'pixi.js'

import eggHead from './assets/eggHead.png'

export class Game {
  #app: PIXI.Application

  constructor() {
    this.#app = new PIXI.Application({ autoStart: false })
  }

  start() {
    this.#app.ticker.start()

    const sprite = PIXI.Sprite.from(eggHead)
    sprite.anchor.set(0.5)
    this.#app.stage.addChild(sprite)

    sprite.x = this.#app.screen.width / 2
    sprite.y = this.#app.screen.height / 2

    this.#app.ticker.add((dt) => {
      sprite.rotation -= 0.01 * dt
    })
  }

  render(container: HTMLElement) {
    this.#fitRenderer(container)
    container.appendChild(this.#app.view)

    window.addEventListener('resize', () => {
      this.#fitRenderer(container)
    })
  }

  #fitRenderer(container: HTMLElement) {
    const containerSizes = container.getBoundingClientRect()
    this.#app.renderer.resize(containerSizes.width, containerSizes.height)
  }
}
