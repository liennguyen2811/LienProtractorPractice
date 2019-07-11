export enum CoordinateType {
    LEFT = "left",
    RIGHT = "right",
    TOP = "top",
    BOTTOM = 'bottom'
}

export enum State {
    ON = "On",
    OFF = "Off"
}

export enum Button {
    F1 = "f1",
    F2 = "f2",
    F3 = "f3",
    F4 = "f4",
    F5 = "f5",
    F6 = "f6",
    F7 = "f7",
    F8 = "f8",
    F9 = "f9",
    F10 = "f10",
    F11 = "f11",
    F12 = "f12",
    ENTER = "enter",
    ESCAPE = "escape",
    CTRL_A = "ctrl+a",
    CTRL_C = "ctrl+c",
    CTRL_V = "ctrl+v",
    BACKSPACE = "backspace",
}

export enum PageName{
  LOGIN = "Login",
  LOGOUT = "Log out",
  REGISTER = "Register",
  CHANGEPASSWORD = "Change password",
  CONTACT ="Contact",
  BOOKTICKET = "Book ticket"
}

export enum RegisterItem{
    EMAIL ="email",
    PASSWORD ="password",
    PID = "pid",
    REGISTER = "register",
    CONFIRMPASSWORD ="confirmPassword"
}

export enum ChangePasswordItem{
    CURRENTPASSWORD = "currentPassword",
    NEWPASSWORD = "newPassword",
    CONFIRMPASSWORD = "confirmPassword"
}
export enum Station
    {
        SAIGON,
        PHANTHIET,
        NHATRANG,
        DANANG,
        HUE,
        QUANGNGAI
    }
export enum SeatType
    {
        HARDSEAT,
        SOFTSEAT,
        SOFTSEATWITHAIR,
        HARDBED,
        SOFTBED,
        SOFTBEDWITHAIR
    }