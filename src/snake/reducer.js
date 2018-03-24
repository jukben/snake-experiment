// @flow
import {Dimensions} from "react-native"


export type Point = {
    x: number,
    y: number,
}

export type Snake = {
    id: string,
    color: string,
    head: Point,
    direction: Point,
    history: Point[],
}

export type SnakeState = {
    snakes: Snake[],
    world_size: Point,
}

export const createEmptyState = () => ({
    world_size: {
        x: Dimensions.get("window").width,
        y: Dimensions.get("window").height
    },
    snakes: [
        {
            id: "snake-1",
            color: "green",
            head: {
                x: Dimensions.get("window").width / 2,
                y: 100,
            },
            direction: {
                x: 0,
                y: 5,
            },
            history: [

            ],
        },
        {
            id: "snake-2",
            color: "red",
            head: {
                x: Dimensions.get("window").width /2,
                y: Dimensions.get("window").height - 100,
            },
            direction: {
                x: 0,
                y: -5,
            },
            history: [

            ],
        }
    ],
})

export const newPoint = (pos: Point, angle: Point): Point => ({
    x: pos.x + angle.x,
    y: pos.y + angle.y,
})

const rotateVector = (vec: Point, ang) => {
    const rad = -ang * (Math.PI / 180)
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)
    return {
        x: Math.round(10000 * (vec.x * cos - vec.y * sin)) / 10000,
        y: Math.round(10000 * (vec.x * sin + vec.y * cos)) / 10000,
    }
}

export const snakeReducer = (state: ?SnakeState, action: Object): SnakeState => {
    if (!state) {
        return createEmptyState()
    }

    switch (action.type) {
        case "CLICK_LEFT": {
            return {
                ...state,
                snakes: state.snakes.map(snake => (snake.id === action.payload.player
                    ? {
                        ...snake,
                        direction: rotateVector(snake.direction, 15),
                    }
                    : snake)),
            }
        }

        case "CLICK_RIGHT":
            return {
                ...state,
                snakes: state.snakes.map(snake => (snake.id === action.payload.player
                    ? {
                        ...snake,
                        direction: rotateVector(snake.direction, -15),
                    }
                    : snake)),
            }

        case "RESTART":
            return createEmptyState()

        case "TICK": {
            return {
                ...state,
                snakes: state.snakes.map(snake => {
                    const next = newPoint(snake.head, snake.direction)
                    return {
                        ...snake,
                        head: next,
                        history: [...snake.history, next],
                    }
                }),
            }
        }
    }

    return state
}
