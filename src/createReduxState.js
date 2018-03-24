// @flow

import { combineReducers, createStore } from "redux"
import { snakeReducer } from "./snake/reducer"
import type { SnakeState } from "./snake/reducer"


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

    return createStore(reducer)
}
