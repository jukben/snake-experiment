
import * as Rx from "rxjs"
import { Vibration } from "react-native"
import type {Snake} from "./reducer"
import {flatten} from "lodash"
import {newPoint} from "./reducer"
import { rotate } from "./actions"


export const collisionDetectionEpic = (action$, deps) =>
    action$.ofType("TICK")
        .concatMap(() => {
            const loser = collision(deps.getState().snake.snakes,
                deps.getState().snake.world_size)

            if (loser) {
                Vibration.vibrate(500)
                Expo.Speech.speak(`${loser.color} is loser!`, {language: 'en'})

                return Rx.Observable.of({
                    type: "GAME_OVER",
                    payload: {
                        loser: loser,
                    },
                })
            }
            else {
                return Rx.Observable.empty()
            }
        })

export const tickEpic = (action$, deps) =>
    Rx.Observable
        .interval(100)
        .switchMap(() => Rx.Observable.if(
            () => !deps.getState().snake.paused,
            [{type: "TICK"}],
            []))

// export const victoryEpic = (action$, deps) =>
//     action$.ofType("GAME_OVER")
//         .switchMap(() => Rx.Observable.fromPromise(fetch("https://www.google.com"))
//             .map(() => ({ type: "GOOGLE_LOADED" })))

export const pressEpic = (action$, deps) =>
    action$.ofType("PRESS_DOWN")
        .switchMap(action => Rx.Observable.merge(
            Rx.Observable.of(rotate(
                action.payload.player,
                action.payload.direction)),
            Rx.Observable
                .interval(100)
                .takeUntil(action$.ofType("PRESS_UP"))
                .map(() => rotate(
                    action.payload.player,
                    action.payload.direction))
        ))

const collision = (snakes: Snake[], world_size: Point): Snake => {
    const all = flatten(snakes.map(s => s.history));
    const col = snakes.find(snake => {
        if (snake.head.x < 0) return true;
        if (snake.head.y < 0) return true;
        if (snake.head.x > world_size.x) return true;
        if (snake.head.y > world_size.y) return true;
        const next = newPoint(snake.head, snake.direction)
        return all.find((p) => {
                return (((p.x - next.x) * (p.x - next.x) + (p.y - next.y) * (p.y - next.y)) < 16)
            }
        )
    })
    return col
}
