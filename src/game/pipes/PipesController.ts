import * as PIXI from 'pixi.js'

import { GameSettings } from '../GameSettings'
import { Ground } from '../ground/Ground'
import { Pipe } from './Pipe'
import { PipesPair } from './PipesPair'
import { getRandomFloat } from '../../utils/random'

export class PipesController {
  #view: PIXI.Container
  #pipePairs: PipesPair[]
  #movingTicker: PIXI.Ticker

  constructor(view: PIXI.Container) {
    this.#view = view
    this.#pipePairs = []
    this.#movingTicker = new PIXI.Ticker()

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
      pipesPair.x -= GameSettings.pipesMovingSpeed
    })

    if (firstPipesPair.x + Pipe.width < 0) {
      this.#pipePairs.shift()
      this.#calcNextPipesPairPosition(firstPipesPair, lastPipesPair)
      this.#pipePairs.push(firstPipesPair)
    }
  }

  #calcNextPipesPairPosition(pipesPair: PipesPair, prevPipesPair: PipesPair | undefined) {
    if (!prevPipesPair) {
      pipesPair.x = GameSettings.width + 200
      return
    }

    const nextPipeDistance = this.#getNextPipeDistance()
    const dyMax = nextPipeDistance / 3 + 2
    const nextMinY = Math.max(pipesPair.y - dyMax, Pipe.height / 3)
    const nextMaxY = Math.min(pipesPair.y + dyMax, GameSettings.height - Ground.height - Pipe.height / 3)

    pipesPair.x = prevPipesPair.x + Pipe.width + nextPipeDistance
    pipesPair.y = getRandomFloat({ from: nextMinY, to: nextMaxY })
  }

  #getNextPipeDistance(): number {
    return GameSettings.pipesDistance
  }
}
