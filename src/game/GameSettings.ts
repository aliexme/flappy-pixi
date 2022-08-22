export class GameSettings {
  static width = 800
  static height = 600

  static gravityPower = 0.35
  static backgroundMovingSpeed = 0.3
  static pipesDistance = 150
  static pipesGap = 96
  static pipesMovingSpeed = 2.5
  static groundMovingSpeed = GameSettings.pipesMovingSpeed
  static birdFlyUpVelocityY = 5.5

  static resize(width: number, height: number) {
    GameSettings.width = width
    GameSettings.height = height
  }
}
