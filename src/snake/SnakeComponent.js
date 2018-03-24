// @flow

import React from "react"
import { View } from "react-native"
import type { Snake } from "./reducer"


type Props = {
    snake: Snake,
}

const SnakeComponent = (props: Props) => {
    return (
        <View style={{
            position: "absolute",
            left: 0,
            top: 0,
}}>
            {props.snake.history.map((p) => (
                <View
                    key={`${p.x}_${p.y}`}
                    style={{
                        position: "absolute",
                        left: p.x,
                        top: p.y,
                        width: 5,
                        height: 5,
                        backgroundColor: props.snake.color,
                    }} />
            ))}
        </View>
    )
}

export default SnakeComponent

