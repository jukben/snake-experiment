// @flow

import { combineReducers, createStore } from "redux"


export const actionButtonClick = () => ({
    type: "BUTTON_CLICK"
})

export type DataState = {
    message: string,
}

export type StateObject = {
    data: DataState,
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
    })

    return createStore(reducer)
}
