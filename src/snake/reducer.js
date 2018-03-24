// @flow


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
}

export const createEmptyState = () => ({
    snakes: [
        {
            id: "snake-1",
            color: "green",
            head: {
                x: 50,
                y: 50,
            },
            direction: {
                x: 5,
                y: 0,
            },
            history: [
                {
                    x: 50,
                    y: 50,
                },
            ],
        },
        {
            id: "snake-2",
            color: "red",
            head: {
                x: 50,
                y: 100,
            },
            direction: {
                x: 5,
                y: 0,
            },
            history: [
                {
                    x: 50,
                    y: 100,
                },
            ],
        }
    ],
})

export const newPoint = (pos: Point, angle: Point): Point => ({
    x: pos.x + angle.x,
    y: pos.y + angle.y,
})

const rotateVector = (vec: Point, ang) => {
    const rad = -ang * (Math.PI/180)
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
