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


const collision = (snakes: Snake[]): boolean => {
    const all = flatten(snakes.map(s => s.history.slice(-1)))

    console.log(all)

    const collision = snakes.find(snake => {
        const next = newPoint(snake.head, snake.direction)
        return all.find(p =>
            Math.sqrt((p.x - next.x) * (p.x - next.x)
                + (p.y - next.y) * (p.y - next.y)) < 5) != null
    })

    return collision != null
}
