import * as PIXI from 'pixi.js'

import { GameSettings } from '../GameSettings'
import { Ground } from '../ground/Ground'

type PipeOptions = {
  top?: boolean
}

export class Pipe extends PIXI.Sprite {
  static width = 52
  static height = 320

  constructor(options: PipeOptions = {}) {
    const { top } = options
    super(PIXI.Texture.from('pipe'))

    const desiredHeight = (GameSettings.height - Ground.height - GameSettings.pipesGap) / 1.2
    const scaleY = Math.max(desiredHeight / Pipe.height, 1)
    this.scale.y = scaleY

    if (top) {
      this.scale.y = -this.scale.y
    }
  }
}
