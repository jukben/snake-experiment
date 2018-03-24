// @flow

export const actionTick = () => ({
    type: "TICK",
})

export const clickLeft = (player: string) => ({
    type: "CLICK_LEFT",
    payload: {
        player: player,
    },
})

export const clickRight = (player: string) => ({
    type: "CLICK_RIGHT",
    payload: {
        player: player,
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
