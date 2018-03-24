import * as Rx from "rxjs"
import type { Snake } from "./reducer"
import { flatten } from "lodash"
import { newPoint } from "./reducer"


export const collisionDetectionEpic = (action$, deps) =>
    action$.ofType("TICK")
        .concatMap(() => {
            if (collision(deps.getState().snake.snakes)) {
                return Rx.Observable.of({
                    type: "RESTART",
                })
            }
            else {
                return Rx.Observable.empty()
            }
        })

export const tickEpic = (action$, deps) =>
    Rx.Observable.interval(100).mapTo({ type: "TICK" })

const collision = (snakes: Snake[]): boolean => {
    const all = flatten(snakes.map(s => s.history));
    const col = snakes.find(snake => {
        const next = newPoint(snake.head, snake.direction)
        return all.find((p) => {
            return (((p.x - next.x) * (p.x - next.x) + (p.y - next.y) * (p.y - next.y)) < 16)
        }
    )})
    return col != null
}
