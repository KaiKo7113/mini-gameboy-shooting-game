/**
 * https://learn.sparkfun.com/tutorials/sparkfun-inventors-kit-for-microbit-experiment-guide/experiment-6-reading-a-button-press
 */
control.onEvent(EventBusSource.MICROBIT_ID_IO_P8, EventBusValue.MICROBIT_PIN_EVT_RISE, function () {
    Blue_B += 1
    basic.pause(100)
})
function Miss () {
    if (Bullet.get(LedSpriteProperty.Y) == Target.get(LedSpriteProperty.Y) && Bullet.get(LedSpriteProperty.X) != Target.get(LedSpriteProperty.X)) {
        Red_Light()
        music.playTone(131, music.beat(BeatFraction.Double))
        game.gameOver()
    }
}
function Light_Off () {
    pins.analogWritePin(AnalogPin.P0, 0)
    pins.analogWritePin(AnalogPin.P1, 0)
    pins.analogWritePin(AnalogPin.P2, 0)
}
function Red_Light () {
    pins.analogWritePin(AnalogPin.P0, 0)
    pins.analogWritePin(AnalogPin.P1, 0)
    pins.analogWritePin(AnalogPin.P2, 1023)
}
input.onGesture(Gesture.Shake, function () {
    Bullet = game.createSprite(Gun.get(LedSpriteProperty.X), Gun.get(LedSpriteProperty.Y))
    Bullet.turn(Direction.Left, 90)
    TotalNum = true
})
function Hit () {
    Green_Light()
    music.playTone(440, music.beat(BeatFraction.Whole))
    game.addScore(1)
    Target.delete()
    Bullet.delete()
    basic.pause(200)
    TotalNum = false
    Target = game.createSprite(randint(0, 4), 0)
    Light_Off()
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showNumber(game.score())
})
function Green_Light () {
    pins.analogWritePin(AnalogPin.P0, 0)
    pins.analogWritePin(AnalogPin.P1, 1023)
    pins.analogWritePin(AnalogPin.P2, 0)
}
control.onEvent(EventBusSource.MICROBIT_ID_IO_P12, EventBusValue.MICROBIT_PIN_EVT_RISE, function () {
    Red_B += 1
    basic.pause(100)
})
let Red_B = 0
let TotalNum = false
let Bullet: game.LedSprite = null
let Blue_B = 0
let Target: game.LedSprite = null
let Gun: game.LedSprite = null
Gun = game.createSprite(2, 4)
Target = game.createSprite(randint(0, 4), 0)
pins.setEvents(DigitalPin.P8, PinEventType.Edge)
pins.setEvents(DigitalPin.P12, PinEventType.Edge)
basic.forever(function () {
    if (Blue_B == 1) {
        Gun.change(LedSpriteProperty.X, -1)
        basic.pause(100)
        Blue_B = 0
    }
    if (Red_B == 1) {
        Gun.change(LedSpriteProperty.X, 1)
        basic.pause(100)
        Red_B = 0
    }
})
basic.forever(function () {
    if (TotalNum == true) {
        Bullet.move(1)
        if (Bullet.isTouching(Target)) {
            Hit()
        } else {
            Miss()
        }
    }
    basic.pause(200)
})
