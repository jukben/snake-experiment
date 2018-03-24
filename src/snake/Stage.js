// @flow

import React from "react"
import { Button, View } from "react-native"
import type { Snake } from "./reducer"
import SnakeComponent from "./SnakeComponent"
import { connect } from "react-redux"
import { actionTick, clickLeft, clickRight } from "./actions"


type Props = {
    snakes: Snake[],
    tick: () => void,
    clickLeft: () => void,
    clickRight: () => void,
}

class Stage extends React.Component<Props> {

    tick = () => this.props.tick()

    componentDidMount() {
        setInterval(() => this.tick(), 100)
    }

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                {this.props.snakes.map(snake => (
                    <SnakeComponent key={snake.id} snake={snake} />
                ))}

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <View>
                        <Button onPress={() => this.props.clickLeft("snake-1")} title="LEFT" />
                        <Button onPress={() => this.props.clickRight("snake-1")} title="RIGHT" />
                    </View>
                    <View>
                        <Button onPress={() => this.props.clickLeft("snake-2")} title="LEFT" />
                        <Button onPress={() => this.props.clickRight("snake-2")} title="RIGHT" />
                    </View>
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state: StateObject) => ({
    snakes: state.snake.snakes,
})

const mapDispatchToProps = {
    tick: actionTick,
    clickLeft: clickLeft,
    clickRight: clickRight,
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage)

