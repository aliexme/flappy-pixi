export class GameSettings {
  static width = 800
  static height = 600

  static gravityPower = 0.3
  static backgroundMovingSpeed = 0.3
  static pipesDistance = 136
  static pipesGap = 100
  static pipesMovingSpeed = 2
  static groundMovingSpeed = GameSettings.pipesMovingSpeed
  static birdFlyUpVelocityY = 4.75

  static resize(width: number, height: number) {
    GameSettings.width = width
    GameSettings.height = height
  }
}
