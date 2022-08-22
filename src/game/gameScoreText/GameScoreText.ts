import * as PIXI from 'pixi.js'

export class GameScoreText extends PIXI.Text {
  constructor(score: number) {
    super(score, {
      fontSize: 36,
      fill: 0xFFFFFF,
      fontWeight: 'bold',
    })

    this.anchor.set(0.5)
  }
}
