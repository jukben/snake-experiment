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
