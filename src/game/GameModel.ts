export class GameModel {
  #score = 0
  #running = false
  #paused = false
  #gameOver = false

  get score() {
    return this.#score
  }

  get running() {
    return this.#running
  }

  get paused() {
    return this.#paused
  }

  get gameOver() {
    return this.#gameOver
  }

  run() {
    this.#running = true
    this.#paused = false
    this.#gameOver = false
  }

  pause() {
    this.#running = false
    this.#paused = true
    this.#gameOver = false
  }

  resume() {
    this.#running = true
    this.#paused = false
    this.#gameOver = false
  }

  setGameOver() {
    this.#running = false
    this.#paused = false
    this.#gameOver = true
  }

  reset() {
    this.#running = false
    this.#paused = false
    this.#gameOver = false
    this.#score = 0
  }

  incrementScore() {
    this.#score++
  }
}
