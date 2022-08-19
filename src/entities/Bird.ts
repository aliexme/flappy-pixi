import * as PIXI from 'pixi.js'

export class Bird extends PIXI.AnimatedSprite {
  constructor() {
    super([
      PIXI.Texture.from('birdDownFlap'),
      PIXI.Texture.from('birdMidFlap'),
      PIXI.Texture.from('birdUpFlap'),
    ])

    this.animationSpeed = 0.1
    this.play()
  }
}
