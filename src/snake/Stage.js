// @flow

import React from "react"
import { Button, View } from "react-native"
import type { Snake } from "./reducer"
import SnakeComponent from "./SnakeComponent"
import { connect } from "react-redux"
import { actionTick, clickLeft, clickRight } from "./actions"


type Props = {
    snakes: Snake[],
    world_size: Point,
    clickLeft: () => void,
    clickRight: () => void,
}

class Stage extends React.Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.stage, {
                        width: this.props.world_size.x,
                        height: this.props.world_size.y}]}>
                    {this.props.snakes.map(snake => (
                        <SnakeComponent key={snake.id} snake={snake} />
                    ))}
                </View>

                <View style={styles.buttons}>
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

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    stage: {
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: "lightgrey",
        alignSelf: "center",
    },
    buttons: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
}

const mapStateToProps = (state: StateObject) => ({
    snakes: state.snake.snakes,
    world_size: state.snake.world_size,
})

const mapDispatchToProps = {
    clickLeft: clickLeft,
    clickRight: clickRight,
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage)

