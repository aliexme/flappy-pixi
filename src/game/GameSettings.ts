export class GameSettings {
  static width = 800
  static height = 600

  static gravityPower = 0.4
  static backgroundMovingSpeed = 0.3
  static groundMovingSpeed = 3
  static birdFlyUpVelocityY = 8

  static resize(width: number, height: number) {
    GameSettings.width = width
    GameSettings.height = height
  }
}
