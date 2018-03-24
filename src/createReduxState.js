// @flow

import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import { snakeReducer } from "./snake/reducer"
import { combineEpics, createEpicMiddleware } from "redux-observable"
import type { SnakeState } from "./snake/reducer"
import { collisionDetectionEpic } from "./snake/epics"


export const actionButtonClick = () => ({
    type: "BUTTON_CLICK"
})

export type DataState = {
    message: string,
}

export type StateObject = {
    data: DataState,
    snake: SnakeState,
}

const dataReducer = (state: ?DataState, action: Object): DataState => {
    if (!state) {
        return {
            message: "Hello boyz"
        }
    }

    switch (action.type) {
        case "BUTTON_CLICK":
            return {
                ...state,
                message: "Good Bye",
            }
    }

    return state
}

export default () => {
    const reducer = combineReducers({
        data: dataReducer,
        snake: snakeReducer,
    })

    const rootEpic = combineEpics(collisionDetectionEpic)

    return createStore(
        reducer,
        compose(applyMiddleware(
            createEpicMiddleware(rootEpic))))
}
