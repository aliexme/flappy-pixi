import * as PIXI from 'pixi.js'

import { GameSettings } from '../GameSettings'

export class Ground extends PIXI.TilingSprite {
  static width = 336
  static height = 112

  constructor() {
    super(PIXI.Texture.from('ground'), GameSettings.width, Ground.height)
  }
}
