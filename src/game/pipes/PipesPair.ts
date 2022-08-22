import { GameSettings } from '../GameSettings'
import { Ground } from '../ground/Ground'
import { Pipe } from './Pipe'

export class PipesPair {
  #topPipe: Pipe
  #bottomPipe: Pipe

  constructor() {
    this.#topPipe = new Pipe({ top: true })
    this.#bottomPipe = new Pipe({ top: false })
    this.y = (GameSettings.height - Ground.height) / 2
  }

  get pipes() {
    return [this.#topPipe, this.#bottomPipe]
  }

  get x() {
    return this.#topPipe.x
  }

  set x(value: number) {
    this.#topPipe.x = value
    this.#bottomPipe.x = value
  }

  get y() {
    return this.#topPipe.y + GameSettings.pipesGap / 2
  }

  set y(value: number) {
    this.#topPipe.y = value - GameSettings.pipesGap / 2
    this.#bottomPipe.y = value + GameSettings.pipesGap / 2
  }

  get topPipe() {
    return this.#topPipe
  }

  get bottomPipe() {
    return this.#bottomPipe
  }
}
