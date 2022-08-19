import * as PIXI from 'pixi.js'

export class Bird extends PIXI.AnimatedSprite {
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
