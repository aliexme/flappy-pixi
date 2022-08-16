import * as PIXI from 'pixi.js'

import eggHead from './assets/eggHead.png'

const app = new PIXI.Application()

document.body.appendChild(app.view)

const sprite = PIXI.Sprite.from(eggHead)
app.stage.addChild(sprite)

let elapsed = 0.0
app.ticker.add((delta) => {
  elapsed += delta
  sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0
})

export {}
