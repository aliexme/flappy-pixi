import * as PIXI from 'pixi.js'

import { GameSettings } from '../GameSettings'
import { Ground } from './Ground'

export class GroundController {
  #view: PIXI.Container
  #groundTiles: Ground[]
  #movingTicker: PIXI.Ticker

  constructor(view: PIXI.Container) {
    this.#view = view
    this.#groundTiles = []
    this.#movingTicker = new PIXI.Ticker()
    this.resetGround()

    this.#movingTicker.add(() => {
      this.#moveGround()
    })
  }

  startMoving() {
    this.#movingTicker.start()
  }

  stopMoving() {
    this.#movingTicker.stop()
  }

  resetGround() {
    this.#view.removeChild(...this.#groundTiles)
    this.#groundTiles.forEach((groundTile) => groundTile.destroy())
    this.#groundTiles = []

    const groundTileExample = new Ground()
    const groundTileWidth = groundTileExample.width
    const groundTileHeight = groundTileExample.height
    const groundTilesCount = Math.ceil(GameSettings.width / groundTileWidth) + 2

    for (let i = 0; i < groundTilesCount; i++) {
      const groundTile = new Ground()
      groundTile.x = i * groundTileWidth
      groundTile.y = GameSettings.height - groundTileHeight
      this.#groundTiles.push(groundTile)
    }

    this.#view.addChild(...this.#groundTiles)
  }

  #moveGround() {
    const firstGroundTile = this.#groundTiles[0]
    const lastGroundTile = this.#groundTiles[this.#groundTiles.length - 1]
    const groundTileWidth = firstGroundTile.width

    this.#groundTiles.forEach((groundTile) => {
      groundTile.x -= GameSettings.groundMovingSpeed
    })

    if (firstGroundTile.x + groundTileWidth < 0) {
      firstGroundTile.x = lastGroundTile.x + groundTileWidth
      this.#groundTiles.shift()
      this.#groundTiles.push(firstGroundTile)
    }
  }
}
