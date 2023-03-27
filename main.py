def my_function():
    while joystickbit.get_button(joystickbit.JoystickBitPin.P14):
        radio.send_number(2)
joystickbit.on_button_event(joystickbit.JoystickBitPin.P14,
    joystickbit.ButtonType.DOWN,
    my_function)

def my_function2():
    radio.send_value("d", 0)
joystickbit.on_button_event(joystickbit.JoystickBitPin.P13,
    joystickbit.ButtonType.UP,
    my_function2)

def on_received_value(name, value):
    global sonar
    if True:
        sonar = value
radio.on_received_value(on_received_value)

def my_function3():
    radio.send_value("e", 0)
joystickbit.on_button_event(joystickbit.JoystickBitPin.P14,
    joystickbit.ButtonType.UP,
    my_function3)

def my_function4():
    while joystickbit.get_button(joystickbit.JoystickBitPin.P13):
        radio.send_number(1)
joystickbit.on_button_event(joystickbit.JoystickBitPin.P13,
    joystickbit.ButtonType.DOWN,
    my_function4)

y = 0
x = 0
rocker_val_x: List[number] = []
rocker_val_y: List[number] = []
sonar = 0
f_lenyomva = 0
radio.set_group(1)
joystickbit.init_joystick_bit()
sonar = 0

def on_forever():
    global f_lenyomva, x, y
    if joystickbit.get_button(joystickbit.JoystickBitPin.P15):
        f_lenyomva = 1
        radio.send_number(5)
        rocker_val_y.reverse()
        rocker_val_x.reverse()
        while 0 == len(rocker_val_x):
            x = rocker_val_x[1]
            y = rocker_val_y[1]
            rocker_val_x.shift()
            rocker_val_y.shift()
        f_lenyomva = 0
basic.forever(on_forever)

def on_forever2():
    if f_lenyomva == 0:
        rocker_val_x.append(Math.map(joystickbit.get_rocker_value(joystickbit.rockerType.X),
                1023,
                0,
                -100,
                100))
        rocker_val_y.append(Math.map(joystickbit.get_rocker_value(joystickbit.rockerType.Y),
                1023,
                0,
                -100,
                100))
basic.forever(on_forever2)

def on_forever3():
    global sonar, x, y
    sonar = 10
    x = Math.map(joystickbit.get_rocker_value(joystickbit.rockerType.X),
        1023,
        0,
        -100,
        100)
    y = Math.map(joystickbit.get_rocker_value(joystickbit.rockerType.Y),
        1023,
        0,
        -100,
        100)
    if f_lenyomva == 0:
        radio.send_value("x", x)
        radio.send_value("y", y)
basic.forever(on_forever3)
