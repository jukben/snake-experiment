import React from "react"
import { Provider } from "react-redux"
import createReduxStore from "./src/createReduxState"
import Root from "./src/Root"

const store = createReduxStore()

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        )
    }
}

export default App
