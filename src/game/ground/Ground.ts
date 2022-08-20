import * as PIXI from 'pixi.js'

export class Ground extends PIXI.Sprite {
  constructor() {
    super(PIXI.Texture.from('ground'))
  }
}
