import * as PIXI from 'pixi.js'

import { GameSettings } from '../GameSettings'
import { Ground } from '../ground/Ground'
import { Pipe } from './Pipe'
import { PipesPair } from './PipesPair'
import { getRandomFloat } from '../../utils/random'

type OnPipeMovedHandler = (prevX: number, nextX: number) => void

export class PipesController {
  #view: PIXI.Container
  #pipePairs: PipesPair[]
  #movingTicker: PIXI.Ticker
  #onPipeMoved: OnPipeMovedHandler

  constructor(view: PIXI.Container, onPipeMoved: OnPipeMovedHandler) {
    this.#view = view
    this.#pipePairs = []
    this.#movingTicker = new PIXI.Ticker()
    this.#onPipeMoved = onPipeMoved

    this.#movingTicker.add(() => {
      this.#movePipes()
    })

    this.resetPipes()
  }

  get pipePairs() {
    return this.#pipePairs
  }

  get pipes() {
    return this.#pipePairs.reduce<Pipe[]>((pipes, pipesPair) => pipes.concat(pipesPair.pipes), [])
  }

  startMoving() {
    this.#movingTicker.start()
  }

  stopMoving() {
    this.#movingTicker.stop()
  }

  resetPipes() {
    this.#view.removeChild(...this.pipes)
    this.pipes.forEach((pipe) => pipe.destroy())
    this.#pipePairs = []
    this.#initPipes()
  }

  #initPipes() {
    const pipesCount = Math.ceil(GameSettings.width / (Pipe.width + GameSettings.pipesDistance)) + 2

    for (let i = 0; i < pipesCount; i++) {
      const prevPipesPair = i > 0 ? this.#pipePairs[i - 1] : undefined
      const pipesPare = new PipesPair()
      this.#calcNextPipesPairPosition(pipesPare, prevPipesPair)
      this.#pipePairs.push(pipesPare)
    }

    this.pipes.forEach((pipe) => this.#view.addChildAt(pipe, 2))
  }

  #movePipes() {
    const firstPipesPair = this.#pipePairs[0]
    const lastPipesPair = this.#pipePairs[this.#pipePairs.length - 1]

    this.#pipePairs.forEach((pipesPair) => {
      const prevX = pipesPair.x
      const nextX = pipesPair.x - GameSettings.pipesMovingSpeed
      pipesPair.x = nextX
      this.#onPipeMoved(prevX, nextX)
    })

    if (firstPipesPair.x + Pipe.width < 0) {
      this.#pipePairs.shift()
      this.#calcNextPipesPairPosition(firstPipesPair, lastPipesPair)
      this.#pipePairs.push(firstPipesPair)
    }
  }

  #calcNextPipesPairPosition(pipesPair: PipesPair, prevPipesPair: PipesPair | undefined) {
    const topMinY = 150
    const bottomMaxY = GameSettings.height - Ground.height - 150

    if (!prevPipesPair) {
      pipesPair.x = GameSettings.width + 200
      pipesPair.y = getRandomFloat({ from: topMinY, to: bottomMaxY })
      return
    }

    const nextPipeDistance = this.#getNextPipeDistance()
    const dyTopMax = nextPipeDistance / 2 + 2
    const dyBottomMax = nextPipeDistance / 1.5 + 2
    const nextMinY = Math.max(pipesPair.y - dyTopMax, topMinY)
    const nextMaxY = Math.min(pipesPair.y + dyBottomMax, bottomMaxY)

    pipesPair.x = prevPipesPair.x + Pipe.width + nextPipeDistance
    pipesPair.y = getRandomFloat({ from: nextMinY, to: nextMaxY })
  }

  #getNextPipeDistance(): number {
    return GameSettings.pipesDistance
  }
}
