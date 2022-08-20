export class GameSettings {
  static width = 800
  static height = 600

  static readonly groundMovingSpeed = 4

  static resize(width: number, height: number) {
    GameSettings.width = width
    GameSettings.height = height
  }
}
