import { Game } from './Game'

const game = new Game()

window.onload = () => {
  const gameContainer = document.getElementById('game-root')
  game.render(gameContainer || document.body)
  game.start()
}

export {}
