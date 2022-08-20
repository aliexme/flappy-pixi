import * as PIXI from 'pixi.js'

export class Bird extends PIXI.AnimatedSprite {
  static width = 34
  static height = 24

  velocityY = 0

  constructor() {
    super([
      PIXI.Texture.from('birdDownFlap'),
      PIXI.Texture.from('birdMidFlap'),
      PIXI.Texture.from('birdUpFlap'),
    ])

    this.anchor.set(0.5)
    this.animationSpeed = 0.1
  }
}
