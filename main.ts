joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.down, function () {
    while (joystickbit.getButton(joystickbit.JoystickBitPin.P14)) {
        radio.sendNumber(2)
    }
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.up, function () {
    radio.sendValue("d", 0)
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function () {
    radio.sendNumber(5)
})
radio.onReceivedValue(function (name, value) {
    if (true) {
        sonar = value
    }
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.up, function () {
    radio.sendValue("e", 0)
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.down, function () {
    while (joystickbit.getButton(joystickbit.JoystickBitPin.P13)) {
        radio.sendNumber(1)
    }
})
let y = 0
let x = 0
let rocker_val_y: number[] = []
let rocker_val_x: number[] = []
let sonar = 0
let f_lenyomva = 0
radio.setGroup(1)
joystickbit.initJoystickBit()
sonar = 0
while (!(rocker_val_x.length == 0 && rocker_val_y.length == 0)) {
    rocker_val_x.shift()
    rocker_val_y.shift()
}
basic.forever(function () {
    basic.showNumber(rocker_val_x.length)
    if (f_lenyomva == 0) {
        rocker_val_x.push(x)
        rocker_val_y.push(y)
    }
})
basic.forever(function () {
    if (joystickbit.getButton(joystickbit.JoystickBitPin.P15)) {
        basic.showIcon(IconNames.Heart)
        f_lenyomva = 1
        rocker_val_y.reverse()
        rocker_val_x.reverse()
        while (!(rocker_val_x.length == 0 && rocker_val_y.length == 0)) {
            x = rocker_val_x[1]
            y = rocker_val_y[1]
            rocker_val_y.shift()
            rocker_val_x.shift()
            radio.sendValue("x", x)
            radio.sendValue("y", y)
            basic.pause(500)
        }
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        f_lenyomva = 0
    }
})
basic.forever(function () {
    sonar = 10
    x = Math.map(joystickbit.getRockerValue(joystickbit.rockerType.X), 1023, 0, -100, 100)
    y = Math.map(joystickbit.getRockerValue(joystickbit.rockerType.Y), 1023, 0, -100, 100)
    if (f_lenyomva == 0) {
        radio.sendValue("x", x)
        radio.sendValue("y", y)
    }
})
