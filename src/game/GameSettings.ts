export class GameSettings {
  static width = 800
  static height = 600

  static gravityPower = 0.4
  static backgroundMovingSpeed = 0.3
  static pipesDistance = 104
  static pipesDistanceMin = GameSettings.pipesDistance / 2
  static pipesDistanceMax = GameSettings.pipesDistance * 1.5
  static pipesGap = 80
  static pipesMovingSpeed = 2.5
  static groundMovingSpeed = GameSettings.pipesMovingSpeed
  static birdFlyUpVelocityY = 5.5

  static resize(width: number, height: number) {
    GameSettings.width = width
    GameSettings.height = height
  }
}
