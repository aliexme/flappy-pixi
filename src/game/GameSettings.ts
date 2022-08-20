export class GameSettings {
  static width = 800
  static height = 600

  static backgroundMovingSpeed = 0.5
  static groundMovingSpeed = 4

  static resize(width: number, height: number) {
    GameSettings.width = width
    GameSettings.height = height
  }
}
