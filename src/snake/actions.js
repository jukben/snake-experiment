// @flow

import type { Snake } from "./reducer"


export const actionTick = () => ({
    type: "TICK",
})

type Direction = "l" | "r"

export const pressDown = (player: string, direction: Direction) => ({
    type: "PRESS_DOWN",
    payload: {
        player: player,
        direction: direction,
    },
})

export const pressUp = (player: string, direction: Direction) => ({
    type: "PRESS_UP",
    payload: {
        player: player,
        direction: direction,
    },
})

export const rotate = (player: Snake, direction: Direction) => ({
    type: "ROTATE",
    payload: {
        player: player,
        angle: direction === "l" ? 15 : -15,
    },
})

export const clickPause = () => ({
    type: "CLICK_PAUSE",
})

export const clickSettings = () => ({
    type: "CLICK_SETTINGS",
})

export const clickRestart = () => ({
    type: "CLICK_RESTART",
})
