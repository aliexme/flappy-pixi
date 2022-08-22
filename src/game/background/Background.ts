import * as PIXI from 'pixi.js'

import { GameSettings } from '../GameSettings'

export class Background extends PIXI.TilingSprite {
  static height = 512

  constructor() {
    super(PIXI.Texture.from('backgroundDay'), GameSettings.width, Background.height)
  }
}
