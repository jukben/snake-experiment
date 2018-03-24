// @flow

import type { StateObject } from "./createReduxState"


export const getGreetings = (state: StateObject): string =>
    state.data.message + " OLA"
